var db     = require('./db');

var create = function(body, callback){
  db.query(`INSERT INTO finish (orderid, po, color, date, size1, size2, size3,size4, size5, size6, size7, size8, size9, size10
  ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.order, body.po, body.color, body.date, body.size1, body.size2, body.size3, body.size4, body.size5,
    body.size6, body.size7, body.size8, body.size9, body.size10], 
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
  db.query('SELECT * FROM finish WHERE po = ? AND date = ?', [body.po, body.date], function(err, rows) {
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
  db.query('UPDATE finish SET ? WHERE id = ? AND orderid = ?', [
    {
      po: body.po, color: body.color,
      size1: body.size1, size2: body.size2, size3: body.size3, size4: body.size4, size5: body.size5,
      size6: body.size6, size7: body.size7, size8: body.size8, size9: body.size9, size10: body.size10      
    },
    body.oldid, body.order
  ], function(err, result){
    if(err){
      return callback(err);
    }      
    return callback(null);
  })
}

var list = function(body, callback){
  db.query('SELECT * FROM finish WHERE orderid = ?', [body.orderid], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var remove = function (body, callback){
  db.query('DELETE FROM finish WHERE id = ?', [body.oldid], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var all = function(callback){
  db.query('SELECT * FROM finish', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}


var getByDate = function(date, callback) {
  db.query(`
    SELECT
      finish.*,
      sum(finish.size1) as size1, sum(finish.size2)as size2, sum(finish.size3) as size3,
      sum(finish.size4) as size4, sum(finish.size5)as size5, sum(finish.size6) as size6,
      sum(finish.size7) as size7, sum(finish.size8)as size8, sum(finish.size9) as size9, sum(finish.size10) as size10,
      orders.name as order_name, orders.buyername as buyername, orderdetail.po as po, orderdetail.style as style, other.name as color,
      sizegroup.size1 as s1, sizegroup.size2 as s2, sizegroup.size3 as s3, sizegroup.size4 as s4, sizegroup.size5 as s5, sizegroup.size6 as s6,
      sizegroup.size7 as s7, sizegroup.size8 as s8, sizegroup.size9 as s9, sizegroup.size10 as s10,
      (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) as orderdetail_pcs
    FROM finish as finish
    INNER JOIN orders as orders on orders.id = finish.orderid
    INNER JOIN orderdetail as orderdetail on orderdetail.id = finish.po
    INNER JOIN other as other on other.code = finish.color
    INNER JOIN sizegroup as sizegroup on sizegroup.id = orders.sizegroup
    WHERE finish.date = ?
    GROUP BY finish.date, orders.name, orders.buyername, orderdetail.po, orderdetail.style, other.name
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
exports.remove = remove;
exports.all = all;
exports.getByDate = getByDate;