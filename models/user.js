var bcrypt = require('bcrypt-nodejs');
var uuidV4 = require('uuid/v4');

var db     = require('./db');
// Set up User class
var User = function(user) {
  var that = Object.create(User.prototype);

  that.id       = user.id;
  that.email    = user.email;
  that.password = user.password;

  return that;
};

// Gets a random id for this user
var generateUserId = function() {
  return uuidV4();
};

// Hash and salt the password with bcrypt
var hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if password is correct
var validPassword = function(password, savedPassword) {
  return bcrypt.compareSync(password, savedPassword);
};

// Create a new user
// callback(err, newUser)
var createUser = function(factory, department, line, firstname, lastname, position, email, password, phone, type, status, callback) {
  var newUser = {
    id: generateUserId(),
    email: email,
    password: hashPassword(password)
  };
  
  db.query('INSERT INTO users ( id, factory, department, line, firstname, lastname, position, email, password, phone, type, status ) values (?,?,?,?,?,?,?,?,?,?,?,?)',    
    [newUser.id, factory, department, line, firstname, lastname, position, email, newUser.password, phone, type, /*status*/0],
    function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return createUser(factory, department, line, firstname, lastname, position, email, password, phone, type, status, callback);
        }
        return callback(err);
      }

      // Successfully created user
      return callback(null, new User(newUser));
    }
  );
};

// Check if a user exists and create them if they do not
// callback(err, newUser)
var signup = function(req, email, password, callback) {
  // Check if there's already a user with that email
  db.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows) {
    if (err)
      return callback(err);

    if (rows.length) {
      return callback(null, false, req.flash('signupMessage', 'An account with that email address already exists.'));
    } else {
      // No user exists, create the user
      //[newUser.id, newUser.email, newUser.password, req.body.FirstName, req.body.LastName, req.body.Department, req.body.PhoneNumber, false],
      //factory, department, line, name, position, email, password, phone, type, status
      return createUser(req.body.Factory, req.body.Department, -1, req.body.FirstName, req.body.LastName, -1, email, password, req.body.PhoneNumber, req.body.type==1?1:0, 1, callback);
    }
  });
};

// Log in a user
// callback(err, user)
var login = function(req, email, password, callback) {  
  // Check that the user logging in exists
  db.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows) {
    if (err)
      return callback(err);

    if (!rows.length)
      return callback(null, false, req.flash('loginMessage', 'No user found.'));

    if (!validPassword(password, rows[0].password))
      return callback(null, false, req.flash('loginMessage', 'Wrong password.'));

    // User successfully logged in, return user
    return callback(null, new User(rows[0]));
  });
};

var verify = function(id, callback){
  db.query('UPDATE users SET active = 1 WHERE id = ?', [id], function(err, result){
    if(err)
      return callback(err);
    return callback(null);
  })
}

exports.signup = signup;
exports.login = login;
exports.verify = verify;

var addUser = function(body, callback){
  db.query('SELECT * FROM users WHERE email = ?', [body.email], function(err, rows) {
    if (err)
      return callback(err);

    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createUser(body.factory, body.department, body.line, body.firstname, body.lastname, body.position, body.email,'12345', body.phone, body.type, body.status, callback);
    }
  });
}
var getUsers = function(callback){
  db.query('SELECT u.*, f.name as fname, d.name as dname, l.name as lname FROM users as u LEFT JOIN factory as f ON u.factory=f.id LEFT JOIN department as d ON u.department=d.id LEFT JOIN line as l ON u.line=l.id', [], function(err, rows) {
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}
var getUser = function(email, callback){
  db.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length == 1) {
      return callback(null,rows[0]);
    }else{
      return callback(null, null);
    }
  });
}
var updateUser = function(data, callback){
  db.query('UPDATE users SET ? WHERE id = ?', [{password: hashPassword(data.pwd)}, data.id], function(err, user){
    if (err)
      return callback(err);
    else{
      return callback(null, user);
    }
  })
}
var updateUserInfo = function(data, callback){
  db.query('UPDATE users SET ? WHERE email = ?', 
    [{email: data.email, firstname: data.firstname, lastname: data.lastname, factory: data.factory, department: data.department, line: data.line,
      phone: data.phone, position: data.position, type: data.type, status: data.status
    }, data.oldemail], function(err, user){
    if (err)
      return callback(err);
    else{
      return callback(null, user);
    }
  })
}
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.updateUserInfo = updateUserInfo;