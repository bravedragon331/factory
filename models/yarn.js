var db     = require('./db');

var createYarn = function(body, callback){
  db.query('INSERT INTO yarn (code, name, status) values (?,?,?)', [body.code, body.name, body.status], function(err){
    if(err){
      if (err.code === 'ER_DUP_ENTRY') {
        // If we somehow generated a duplicate user id, try again
        return createYarn(body, callback);
      }
      return callback(err);
    }
    return callback(null, true);
  })
}

var addYarn = function(body, callback){
  db.query('SELECT * FROM yarn WHERE code = ?', [body.code], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createYarn(body, callback);
    }
  });
}

var updateYarn = function(body, callback){
  db.query('UPDATE yarn SET ? WHERE code = ?', [{code: body.code, name: body.name, status: body.status}, body.oldcode], function(err, result){
    if(err)
      return callback(err);
    return callback(null, true);
  })
}

var getYarns= function(callback){
  db.query('SELECT * FROM yarn', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var removeYarn = function(code, callback){
  db.query('DELETE FROM yarn WHERE code = ?', [code], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

exports.addYarn = addYarn;
exports.updateYarn = updateYarn;
exports.getYarns = getYarns;
exports.removeYarn = removeYarn;