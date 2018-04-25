var db     = require('./db');

var createSubMaterial = function(body, callback){
  db.query('INSERT INTO submaterial (code, name, type1, type2, status) values (?,?,?,?,?)', [body.code, body.name, body.type1, body.type2, body.status], function(err){
    if(err){
      console.log(err);
      if (err.code === 'ER_DUP_ENTRY') {
        // If we somehow generated a duplicate user id, try again
        return createSubMaterial(body, callback);
      }
      return callback(err);
    }
    return callback(null, true);
  })
}

var addSubMaterial = function(body, callback){
  console.log(body);
  db.query('SELECT * FROM submaterial WHERE code = ?', [body.code], function(err, rows) {
    console.log(err);
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createSubMaterial(body, callback);
    }
  });
}

var updateSubMaterial = function(body, callback){
  db.query('UPDATE submaterial SET ? WHERE code = ?', [{code: body.code, name: body.name, type1: body.type1, type2: body.type2, status: body.status}, body.oldcode], function(err, result){
    if(err)
      return callback(err);
    return callback(null, true);
  })
}

var getSubMaterials= function(callback){
  db.query('SELECT * FROM submaterial', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var removeSubMaterial = function(code, callback){
  db.query('DELETE FROM submaterial WHERE code = ?', [code], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var getSubMaterialList = function(type, callback){
  db.query('SELECT * FROM submaterial WHERE type1 = ?', [type], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

exports.addSubMaterial = addSubMaterial;
exports.updateSubMaterial = updateSubMaterial;
exports.getSubMaterials = getSubMaterials;
exports.removeSubMaterial = removeSubMaterial;
exports.getSubMaterialList = getSubMaterialList;