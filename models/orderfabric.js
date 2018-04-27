
var db     = require('./db');

var createFabric = function(body, callback){
  db.query('INSERT INTO orderfabric (orderid, fabrictypecode, fabriccode, width, weight) values (?,?,?,?,?)', 
  [body.id, body.typecode, body.fabriccode,body.width, body.weight], 
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
  console.log(body);
  db.query('SELECT * FROM orderfabric WHERE orderid = ? AND fabriccode = ? AND fabrictypecode = ?', 
  [body.id, body.fabriccode, body.typecode], 
  function(err, rows) {
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
  db.query(`SELECT of.*, ft.name as fabrictypecodename, f.name as fabriccodename FROM orderfabric 
  as of INNER JOIN other as ft ON of.fabrictypecode = ft.id INNER JOIN fabric as f ON f.id = of.fabriccode and of.orderid = ?`, [body.id], function(err, rows){
    if(err){
      callback(err);
    }else{
      return callback(null, rows)
    }
    
  })
}

var updateFabric = function(body, callback){
  db.query('UPDATE orderfabric SET ? WHERE id = ?', 
  [{fabrictypecode: body.typecode, fabriccode: body.fabriccode, width: body.width, weight: body.weight}, body.id],
  function(err, result){
    if(err)
      return callback(err);
    return callback(null, true);
  })
}

var getFabric = function(body, callback){
  db.query(`SELECT of.*, ft.name as fabrictypecodename, f.name as fabriccodename FROM orderfabric 
  as of INNER JOIN other as ft ON of.fabrictypecode = ft.id INNER JOIN fabric as f ON f.id = of.fabriccode and of.id = ?`, [body.id], function(err, rows){
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
  db.query(`SELECT of.*, ft.name as fabrictypecodename, f.name as fabriccodename FROM orderfabric 
  as of INNER JOIN other as ft ON of.fabrictypecode = ft.id INNER JOIN fabric as f ON f.id = of.fabriccode`, [], function(err, rows){
    if(err){
      console.log(err);
      return callback(err);
    }else{
      console.log(rows);
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