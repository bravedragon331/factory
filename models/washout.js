var db     = require('./db');

var create = function(body, callback){
  console.log(body);
  db.query(`INSERT INTO washout (orderid, po, color, customer, washdate, invoice, size1, size2, size3,size4, size5, size6, size7, size8, size9, size10
  ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.order, body.po, body.color, body.customer, body.washdate, body.invoice, body.size1, body.size2, body.size3, body.size4, body.size5,
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
  console.log(body);
  db.query('SELECT * FROM washout WHERE po = ? AND invoice = ? AND customer = ?', [body.po, body.invoice, body.customer], function(err, rows) {
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
  db.query('UPDATE washout SET ? WHERE id = ? AND orderid = ?', [
    {
      po: body.po, color: body.color, customer: body.customer, washdate: body.washdate, invoice: body.invoice, 
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

var remove = function (body, callback){
  db.query('DELETE FROM washout WHERE id = ?', [body.oldid], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var list = function(body, callback){
  db.query('SELECT * FROM washout WHERE orderid = ?', [body.orderid], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var all = function(callback){
  db.query('SELECT * FROM washout', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var getByDate = function(date, callback) {  
  db.query(
    `SELECT 
      washout.*, orders.name as order_name, orders.buyername as buyername, orderdetail.style as style,
      customer.name as customer, other.name as color,
      (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) as orderdetail_pcs,
      sum(washout.size1+washout.size2+washout.size3+washout.size4+washout.size5+washout.size6+washout.size7+washout.size8+washout.size9+washout.size10) as pcs
    FROM washout as washout
    INNER JOIN orderdetail as orderdetail on washout.po = orderdetail.id
    INNER JOIN orders as orders on washout.orderid = orders.id
    INNER JOIN customer as customer on washout.customer = customer.id
    INNER JOIN other as other on other.code = washout.color
    WHERE washout.washdate <= ?
    GROUP BY washout.id
    `, [date],
    function(err, result) {
      console.log(err);
      if(err) callback(err);
      else callback(null, result);
    }
  )
}

exports.add = add;
exports.update = update;
exports.list = list;
exports.update = update;
exports.remove = remove;
exports.all = all;
exports.getByDate = getByDate;