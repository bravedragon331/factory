var db     = require('./db');

var create = function(body, callback){
  db.query(`INSERT INTO cut (orderid, fabric, style, color, colorname, lote, yds, cutdate, cutord, size1, size2, size3,size4, size5, size6, 
    size7, size8, size9, size10, envio, lienzos, ydsetique, malo, faltante, ydsused, bies, total, qtyrollo, tendedor, remark
  ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.order, body.fabric, body.style, body.color, body.colorname, body.lote, body.yds, body.cutdate, body.cutord, body.size1, body.size2, body.size3, body.size4, body.size5,
    body.size6, body.size7, body.size8, body.size9, body.size10, body.envio, body.lienzos, body.ydsetique, body.malo, 
    body.faltante, body.ydsused, body.bies, body.total, body.qtyrollo, body.tendedor, body.remark], 
    function(err)
  {
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
  db.query('SELECT * FROM cut WHERE fabric = ? AND style = ? AND color = ? AND cutord = ?', [body.fabric, body.style, body.color, body.cutord], function(err, rows) {
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
  db.query('UPDATE cut SET ? WHERE id = ?', [
    {
      style: body.style, color: body.color, colorname: body.colorname, lote: body.lote, yds: body.yds, cutdate: body.cutdate, cutord:body.cutord, 
      size1: body.size1, size2: body.size2, size3: body.size3, size4: body.size4, size5: body.size5,
      size6: body.size6, size7: body.size7, size8: body.size8, size9: body.size9, size10: body.size10, 
      envio: body.envio, lienzos: body.lienzos, ydsetique:body.ydsetique, malo: body.malo, 
      faltante: body.faltante, ydsused: body.ydsused, bies: body.bies, total: body.total, qtyrollo: body.qtyrollo, tendedor: body.tendedor, remark: body.remark
    },
    body.oldid
  ], function(err, result){
    if(err){
      return callback(err);
    }      
    return callback(null);
  })
}

var list = function(body, callback){
  db.query('SELECT * FROM cut WHERE orderid = ? AND fabric = ?', [body.orderid, body.fabric], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var deleteCut = function (body, callback){
  db.query('DELETE FROM cut WHERE id = ?', [body.oldid], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var all = function(callback){
  db.query('SELECT * FROM cut', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var getByDate = function(date, callback) {
  db.query(`
    SELECT 
      cut.*, orders.name as order_name, orders.buyername as buyername, fabric.name as fabric, 
      sum(cut.size1+cut.size2+cut.size3+cut.size4+cut.size5+cut.size6+cut.size7+cut.size8+cut.size9+cut.size10) as pcs,
      (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) as orderdetail_pcs
    FROM cut as cut
    INNER JOIN orders as orders on orders.id = cut.orderid
    INNER JOIN fabric as fabric on fabric.id = cut.fabric
    INNER JOIN orderdetail as orderdetail ON cut.color = orderdetail.color AND cut.style = orderdetail.style AND cut.orderid = orderdetail.orderid
    WHERE cut.cutdate <= ?
    GROUP BY cut.id
    `, [date],
  function(err, rows) {
    if(err) callback(err);
    else callback(null, rows);
  })
}

exports.add = add;
exports.update = update;
exports.list = list;
exports.update = update;
exports.deleteCut = deleteCut;
exports.all = all;
exports.getByDate = getByDate;