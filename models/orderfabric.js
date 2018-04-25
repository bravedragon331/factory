
var db     = require('./db');

var createFabric = function(body, callback){
  db.query('INSERT INTO orderfabric (orderid, yarncode, yarncodename, fabrictypecode, fabrictypecodename, fabriccode, fabriccodename, width, weight) values (?,?,?,?,?,?,?,?,?)', 
  [body.id, body.yarncode, body.yarncodename, body.typecode, body.typecodename, body.fabriccode, body.fabriccodename, body.width, body.weight], 
  function(err){
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
  db.query('SELECT * FROM orderfabric WHERE orderid = ? AND yarncode = ? AND fabriccode = ? AND fabrictypecode = ?', 
  [body.id, body.yarncode, body.fabriccode, body.typecode], 
  function(err, rows) {
    console.log(err);
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

var getFabrics= function(body, callback){
  db.query('SELECT * FROM orderfabric where orderid = ?', [body.id], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var updateFabric = function(body, callback){
  db.query('UPDATE orderfabric SET ? WHERE id = ?', 
  [{yarncode: body.yarncode, yarncodename: body.yarncodename, fabrictypecode: body.typecode, fabrictypecodename: body.typecodename,
  fabriccode: body.fabriccode, fabriccodename: body.fabriccodename, width: body.width, weight: body.weight}, body.id],
  function(err, result){
    if(err)
      return callback(err);
    return callback(null, true);
  })
}

var getFabric = function(body, callback){
  db.query('SELECT * FROM orderfabric WHERE id = ?', [body.id], function(err, rows){
    if(err)
      callback(err);
    return callback(null, rows[0])
  })
}

var removeFabric = function(id, callback){
  db.query('DELETE FROM orderfabric WHERE id = ?', [id], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var getAll = function(callback){
  db.query('SELECT * FROM orderfabric', [], function(err, rows){
    if(err){
      return callback(err);
    }else{
      return callback(null, rows);
    }
  })
}

exports.addFabric = addFabric;
exports.updateFabric = updateFabric;
exports.getFabric = getFabric;
exports.getFabrics = getFabrics;
exports.getAll = getAll;
exports.removeFabric = removeFabric;