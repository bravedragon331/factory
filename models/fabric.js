var db     = require('./db');

var createFabric = function(body, callback){
  db.query('INSERT INTO fabric (code, name, status) values (?,?,?)', [body.code, body.name, body.status], function(err){
    if(err){
      if (err.code === 'ER_DUP_ENTRY') {
        // If we somehow generated a duplicate user id, try again
        return createFabric(body, callback);
      }
      return callback(err);
    }
    return callback(null, true);
  })
}

var addFabric = function(body, callback){
  db.query('SELECT * FROM fabric WHERE code = ?', [body.code], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createFabric(body, callback);
    }
  });
}

var updateFabric = function(body, callback){
  db.query('UPDATE fabric SET ? WHERE code = ?', [{code: body.code, name: body.name, status: body.status}, body.oldcode], function(err, result){
    if(err)
      return callback(err);
    return callback(null, true);
  })
}

var getFabrics= function(callback){
  db.query('SELECT * FROM fabric', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var removeFabric = function(code, callback){
  db.query('DELETE FROM fabric WHERE code = ?', [code], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

exports.addFabric = addFabric;
exports.updateFabric = updateFabric;
exports.getFabrics = getFabrics;
exports.removeFabric = removeFabric;