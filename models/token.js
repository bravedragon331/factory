var bcrypt = require('bcrypt-nodejs');
var db     = require('./db');

// Set up Token class
var Token = function(token) {
  var that = Object.create(Token.prototype);

  that.userid       = token.id;
  that.token    = token.token;

  return that;
};

// Hash and salt the password with bcrypt
var generate = function() {
  return bcrypt.hashSync(Date.now, bcrypt.genSaltSync(8), null);
};

var generateToken = function(userid, callback){
  var newToken = {
    userid: userid,
    token: generate(),
  };
  db.query('INSERT INTO token ( userid, token ) values (?,?)',
    [newToken.userid, newToken.token],
    function(err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return generateToken(newToken.userid, newToken.token, callback);
        }
        return callback(err);
      }
      // Successfully created user
      return callback(null, new Token(newToken));
    }
  );
}

var findToken = function(data, callback){
  db.query('SELECT * FROM token WHERE token = ? AND userid = ?', [data.token, data.id], function(err, token) {
    if (err)
      return callback(err);

    // User successfully logged in, return user
    return callback(null, token);
  });
}

exports.generateToken = generateToken;
exports.findToken = findToken;