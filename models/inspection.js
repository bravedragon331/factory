var db     = require('./db');

var create = function(body, callback){
  console.log(body);
  db.query(`INSERT INTO inspection (orderid, style, color, colorname, date, invoice, size1, size2, size3,size4, size5, size6, size7, size8, size9, size10, segundas, defectos
  ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.order, body.style, body.color, body.colorname, body.date, body.invoice, body.size1, body.size2, body.size3, body.size4, body.size5,
    body.size6, body.size7, body.size8, body.size9, body.size10, body.segundas, body.defectos], 
    function(err)
  {
    if(err){
      console.log(err);
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
  db.query('SELECT * FROM inspection WHERE orderid = ? AND style = ? AND invoice = ? AND color = ?', [body.order, body.style, body.invoice, body.color], function(err, rows) {
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
  db.query('UPDATE inspection SET ? WHERE id = ? AND orderid = ?', [
    {
      style: body.style, color: body.color, colorname: body.colorname, date: body.date, invoice: body.invoice, 
      size1: body.size1, size2: body.size2, size3: body.size3, size4: body.size4, size5: body.size5,
      size6: body.size6, size7: body.size7, size8: body.size8, size9: body.size9, size10: body.size10, segundas: body.segundas, defectos: body.defectos
    },
    body.oldid, body.order
  ], function(err, result){
    if(err){
      console.log(err);
      return callback(err);
    }      
    return callback(null);
  })
}

var list = function(body, callback){
  db.query('SELECT * FROM inspection WHERE orderid = ?', [body.orderid], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var all = function(callback){
  db.query('SELECT * FROM inspection', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

exports.add = add;
exports.update = update;
exports.list = list;
exports.update = update;
exports.all = all;