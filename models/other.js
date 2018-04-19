var db     = require('./db');

var createOther = function(body, callback){
  db.query('INSERT INTO other (code, name, type1, type2, status) values (?,?,?,?,?)', [body.code, body.name, body.type1, body.type2, body.status], function(err){
    if(err){
      if (err.code === 'ER_DUP_ENTRY') {
        // If we somehow generated a duplicate user id, try again
        return createOther(body, callback);
      }
      return callback(err);
    }
    return callback(null, true);
  })
}

var addOther = function(body, callback){
  db.query('SELECT * FROM other WHERE type1 = ? AND code = ?', [body.type1, body.code], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createOther(body, callback);
    }
  });
}

var updateOther = function(body, callback){
  db.query('UPDATE other SET ? WHERE type1 = ? AND code = ?', [{code: body.code, name: body.name, type1: body.type1, type2: body.type2, status: body.status}, body.oldtype, body.oldcode], function(err, result){
    if(err)
      return callback(err);
    return callback(null, true);
  })
}

var getOthers= function(body, callback){
  db.query('SELECT * FROM other WHERE type1 = ?', [body.type], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var getAll = function(callback){
  db.query('SELECT * FROM other', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var removeOther = function(item, code, callback){
  db.query('DELETE FROM other WHERE code = ? AND type1 = ?', [code, item], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var getBuyerCode = function(callback){
  db.query('SELECT * FROM other WHERE type1 = ? AND name = ?', ['Customer Type', 'Buyer'], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

exports.addOther = addOther;
exports.updateOther = updateOther;
exports.getOthers = getOthers;
exports.getAll = getAll;
exports.removeOther = removeOther;
exports.getBuyerCode = getBuyerCode;