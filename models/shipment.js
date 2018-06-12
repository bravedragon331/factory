var db     = require('./db');

var create = function(body, callback){
  db.query(`INSERT INTO shipment (orderid, po, color, date, size1, size2, size3,size4, size5, size6, size7, size8, size9, size10
  ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.order, body.po, body.color, body.date, body.size1, body.size2, body.size3, body.size4, body.size5,
    body.size6, body.size7, body.size8, body.size9, body.size10], 
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
  db.query('SELECT * FROM shipment WHERE po = ? AND date = ?', [body.po, body.date], function(err, rows) {
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
  db.query('UPDATE shipment SET ? WHERE id = ? AND orderid = ?', [
    {
      po: body.po, color: body.color, date: body.date,
      size1: body.size1, size2: body.size2, size3: body.size3, size4: body.size4, size5: body.size5,
      size6: body.size6, size7: body.size7, size8: body.size8, size9: body.size9, size10: body.size10      
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
  db.query('SELECT * FROM shipment WHERE orderid = ?', [body.orderid], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var remove = function (body, callback){
  db.query('DELETE FROM shipment WHERE id = ?', [body.oldid], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var all = function(callback){
  db.query('SELECT * FROM shipment', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var getByDateRange = function(startdate, enddate, callback) {
  console.log(startdate, enddate);
  db.query(`
    SELECT
      shipment.*, orders.name as order_name, orders.buyername as buyername, orderdetail.po as po, orderdetail.style as style, other.name as color,
      sizegroup.size1 as s1, sizegroup.size2 as s2, sizegroup.size3 as s3, sizegroup.size4 as s4, sizegroup.size5 as s5, sizegroup.size6 as s6,
      sizegroup.size7 as s7, sizegroup.size8 as s8, sizegroup.size9 as s9, sizegroup.size10 as s10,
      (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) as orderdetail_pcs
    FROM shipment as shipment
    INNER JOIN orders as orders on orders.id = shipment.orderid
    INNER JOIN orderdetail as orderdetail on orderdetail.id = shipment.po
    INNER JOIN other as other on other.code = shipment.color
    INNER JOIN sizegroup as sizegroup on sizegroup.id = orders.sizegroup
    WHERE shipment.date >= ? AND shipment.date <= ?
    GROUP BY shipment.id
  `, [startdate, enddate],
  function(err, rows) {
    console.log(err, rows);
    if(err) callback(err);
    else callback(null, rows);
  })
}

exports.add = add;
exports.update = update;
exports.list = list;
exports.update = update;
exports.remove = remove;
exports.all = all;
exports.getByDateRange = getByDateRange;