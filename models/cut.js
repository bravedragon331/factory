var db     = require('./db');

var create = function(body, callback){
  console.log(body);
  db.query(`INSERT INTO cut (orderid, po, color, lote, yds, cutdate, cutord, size1, size2, size3,size4, size5, size6, 
    size7, size8, size9, size10, envio, lienzos, ydsetique, malo, faltante, ydsused, bies, total, qtyrollo, tendedor
  ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.order, body.po, body.color, body.lote, body.yds, body.cutdate, body.cutord, body.size1, body.size2, body.size3, body.size4, body.size5,
    body.size6, body.size7, body.size8, body.size9, body.size10, body.envio, body.lienzos, body.ydsetique, body.malo, 
    body.faltante, body.ydsused, body.bies, body.total, body.qtyrollo, body.tendedor], 
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
  db.query('SELECT * FROM cut WHERE po = ? AND cutord = ?', [body.po, body.cutord], function(err, rows) {
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
  console.log(body);
  db.query('UPDATE cut SET ? WHERE id = ? AND cutord = ? AND orderid = ?', [
    {
      po: body.po, color: body.color, lote: body.lote, yds: body.yds, cutdate: body.cutdate, cutord:body.cutord, 
      size1: body.size1, size2: body.size2, size3: body.size3, size4: body.size4, size5: body.size5,
      size6: body.size6, size7: body.size7, size8: body.size8, size9: body.size9, size10: body.size10, 
      envio: body.envio, lienzos: body.lienzos, ydsetique:body.ydsetique, malo: body.malo, 
      faltante: body.faltante, ydsused: body.ydsused, bies: body.bies, total: body.total, qtyrollo: body.qtyrollo, tendedor: body.tendedor
    },
    body.oldid, body.cutord, body.order
  ], function(err, result){
    if(err){
      console.log(err);
      return callback(err);
    }      
    return callback(null);
  })
}

var list = function(body, callback){
  db.query('SELECT * FROM cut WHERE orderid = ?', [body.orderid], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var all = function(callback){
  db.query('SELECT * FROM cut', [], function(err, rows) {    
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