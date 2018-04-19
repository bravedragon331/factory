var db     = require('./db');

var create = function(body, callback){
  db.query('INSERT INTO sizegroup (code, name, customer, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, status) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
    [body.code, body.name, body.customer, body.size1, body.size2, body.size3, body.size4, body.size5, body.size6, body.size7, body.size8, body.size9, body.size10, body.status],
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
  db.query('SELECT * FROM sizegroup WHERE code = ?', [body.code], function(err, rows) {
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

var update = function(body, callback){  
  db.query('UPDATE sizegroup SET ? WHERE code = ? AND customer = ?', 
  [{code:body.code, name: body.name, size1: body.size1, size2: body.size2, size3: body.size3, size4: body.size4, size5: body.size5, 
    size6: body.size6, size7: body.size7, size8: body.size8, size9: body.size9, size10: body.size10, status: body.status}, body.oldcode, body.customer], function(err, result){
    if(err)
      return callback(err);
    else
      return callback(null, true);
  })
}
var remove = function(customer, code, callback){
  db.query('DELETE FROM sizegroup WHERE code = ? AND customer = ?', [code, customer], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}
var get = function(body, callback){  
  db.query('SELECT * FROM sizegroup WHERE customer = ?', [body.customer], function(err, rows) {
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