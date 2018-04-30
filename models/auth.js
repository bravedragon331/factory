var db = require('./db');

var createAuth = function(body, callback){
  db.query('INSERT INTO auth (user, page, r, w, d, status) values (?,?,?,?,?,?)', [body.id, body.page, body.read, body.write, body.delete, body.status], function(err){
    if(err){
      if (err.code === 'ER_DUP_ENTRY') {
        // If we somehow generated a duplicate user id, try again          
        return createAuth(body, callback);
      }
      return callback(err);
    }
    return callback(null, true);
  })
}

var addAuth = function(body, callback){
  db.query('SELECT * FROM auth WHERE user = ? AND page = ?', [body.id, body.page], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user      
      return createAuth(body, callback);
    }
  });  
}
var updateAuth = function(body, callback){
  console.log(body);
  db.query('UPDATE auth SET ? WHERE user = ? AND page = ?', [{page: body.page, r: body.read, w: body.write, d: body.delete, status: body.status}, body.id, body.page], function(err, result){
    if(err)
      return callback(err);
    return callback(null, true);
  })
}
var getAuths = function(id, callback){
  db.query('SELECT * FROM auth WHERE user = ?', [id], function(err, rows){
    console.log(rows);
    if(err)
      return callback(err);
    else{
      return callback(null, rows);
    }
  })
}
var removeAuth = function(index, callback){
  db.query('DELETE FROM auth WHERE page = ?', [index], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}
exports.addAuth = addAuth;
exports.updateAuth = updateAuth;
exports.getAuths = getAuths;
exports.removeAuth = removeAuth;