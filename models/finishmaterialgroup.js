var db     = require('./db');

var create = function(body, callback){  
  db.query('INSERT INTO finishmaterialgroup (code, name, customer, finishmaterial1, finishmaterial2, finishmaterial3, finishmaterial4, finishmaterial5, finishmaterial6, finishmaterial7, finishmaterial8, finishmaterial9, finishmaterial10, status) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
    [body.code, body.name, body.customer, body.finishmaterial1, body.finishmaterial2, body.finishmaterial3, body.finishmaterial3, body.finishmaterial5, body.finishmaterial6, body.finishmaterial7, body.finishmaterial8, body.finishmaterial9, body.finishmaterial10, body.status],
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
  console.log(body);
  db.query('SELECT * FROM finishmaterialgroup WHERE code = ?', [body.code], function(err, rows) {
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
  db.query('SELECT * FROM finishmaterialgroup WHERE customer = ?', [body.customer], function(err, rows) {
    if (err)
      return callback(err);
    else
      return callback(null,rows);    
  });
}
var update = function(body, callback){  
  db.query('UPDATE finishmaterialgroup SET ? WHERE code = ? AND customer = ?', 
  [{code:body.code, name: body.name, finishmaterial1: body.finishmaterial1, finishmaterial2: body.finishmaterial2, finishmaterial3: body.finishmaterial3, finishmaterial4: body.finishmaterial4, finishmaterial5: body.finishmaterial5, 
    finishmaterial6: body.finishmaterial6, finishmaterial7: body.finishmaterial7, finishmaterial8: body.finishmaterial8, finishmaterial9: body.finishmaterial9, finishmaterial10: body.finishmaterial10, status: body.status}, body.oldcode, body.customer], function(err, result){
    if(err)
      return callback(err);
    else
      return callback(null, true);
  })
}
var remove = function(code, customer, callback){
  db.query('DELETE FROM finishmaterialgroup WHERE code = ? AND customer = ?', [code, customer], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}
var getByID = function(id, callback){
  db.query('SELECT * FROM finishmaterialgroup WHERE id = ?', [id], function(err, rows) {
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