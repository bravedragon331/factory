var db     = require('./db');

var create = function(body, profileimage, callback){
  db.query('INSERT INTO customer (name, type, address, contact, email, phone, profileimage, status) values (?,?,?,?,?,?,?,?)',
    [body.name, body.type, body.address, body.contact, body.email, body.phone, profileimage, body.status], function(err)
  {
    if(err){
      if (err.code === 'ER_DUP_ENTRY') {
        // If we somehow generated a duplicate user id, try again
        return create(body, profileimage, callback);
      }
      return callback(err);
    }
    return callback(null, true);
  })
}

var add = function(body, profileimage, callback){
  db.query('SELECT * FROM customer WHERE email = ?', [body.email], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return create(body, profileimage, callback);
    }
  });
}

var update = function(body, profileimage, callback){
  db.query('UPDATE customer SET ? WHERE email = ?', [
    {
      name: body.name, type: body.type, address: body.address, contact: body.contact, 
      email: body.email, phone: body.phone, profileimage: profileimage, status: body.status
    }, 
    body.oldemail
  ], function(err, result){
    if(err)
      return callback(err);
    return callback(null);
  })
}

var list = function(callback){
  db.query('SELECT * FROM customer', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var get = function(body, callback){
  db.query('SELECT * FROM customer WHERE email = ?', [body.email], function(err, rows) {
    if (err)
      return callback(err);
    else
      return callback(null,rows);
  });
}

exports.add = add;
exports.list = list;
exports.get = get;
exports.update = update;