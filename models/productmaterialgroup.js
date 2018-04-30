var db     = require('./db');

var create = function(body, callback){
  db.query('INSERT INTO productmaterialgroup (code, name, customer, productmaterial1, productmaterial2, productmaterial3, productmaterial4, productmaterial5, productmaterial6, productmaterial7, productmaterial8, productmaterial9, productmaterial10, status) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
    [body.code, body.name, body.customer, body.productmaterial1, body.productmaterial2, body.productmaterial3, body.productmaterial3, body.productmaterial5, body.productmaterial6, body.productmaterial7, body.productmaterial8, body.productmaterial9, body.productmaterial10, body.status],
    function(err){
      if(err){
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return create(body, callback);
        }
        return callback(err);
      }
      return callback(null, true);
  })
}

var add = function(body, callback){  
  db.query('SELECT * FROM productmaterialgroup WHERE code = ? AND customer = ?', [body.code, body.customer], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return create(body, callback);
    }
  });
}

var get = function(body, callback){  
  db.query('SELECT * FROM productmaterialgroup WHERE customer = ?', [body.customer], function(err, rows) {
    if (err)
      return callback(err);
    else
      return callback(null,rows);    
  });
}

var update = function(body, callback){  
  db.query('UPDATE productmaterialgroup SET ? WHERE code = ? AND customer = ?', 
  [{code:body.code, name: body.name, productmaterial1: body.productmaterial1, productmaterial2: body.productmaterial2, productmaterial3: body.productmaterial3, productmaterial4: body.productmaterial4, productmaterial5: body.productmaterial5, 
    productmaterial6: body.productmaterial6, productmaterial7: body.productmaterial7, productmaterial8: body.productmaterial8, productmaterial9: body.productmaterial9, productmaterial10: body.productmaterial10, status: body.status}, body.oldcode, body.customer], function(err, result){
    if(err)
      return callback(err);
    else
      return callback(null, true);
  })
}
var remove = function(code, customer, callback){
  db.query('DELETE FROM productmaterialgroup WHERE code = ? AND customer = ?', [code, customer], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}
var getByID = function(id, callback){
  db.query('SELECT * FROM productmaterialgroup WHERE id = ?', [id], function(err, rows) {
    if (err)
      return callback(err);
    else
      return callback(null,rows);    
  });
}

exports.add = add;
exports.update = update;
exports.remove = remove;
exports.get = get;
exports.getByID = getByID;