var db     = require('./db');

var create = function(body, callback){
  db.query(`INSERT INTO printreturn (orderid, po, color, customer, printdate, invoice, size1, size2, size3,size4, size5, size6, size7, size8, size9, size10
  ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.order, body.po, body.color, body.customer, body.printdate, body.invoice, body.size1, body.size2, body.size3, body.size4, body.size5,
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
  db.query('SELECT * FROM printreturn WHERE po = ? AND invoice = ? AND customer = ?', [body.po, body.invoice, body.customer], function(err, rows) {
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
  db.query('UPDATE printreturn SET ? WHERE id = ? AND orderid = ?', [
    {
      po: body.po, color: body.color, customer: body.customer, printdate: body.printdate, invoice: body.invoice, 
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
  db.query('DELETE FROM printreturn WHERE id = ?', [body.oldid], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var list = function(body, callback){
  db.query('SELECT * FROM printreturn WHERE orderid = ?', [body.orderid], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var all = function(callback){
  db.query('SELECT * FROM printreturn', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var getByDate = function(date, callback) {
  db.query(
    `SELECT 
      printreturn.*, orders.name as order_name, orders.buyername as buyername, orderdetail.style as style,
      customer.name as customer, other.name as color,
      (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) as orderdetail_pcs,
      sum(printreturn.size1+printreturn.size2+printreturn.size3+printreturn.size4+printreturn.size5+printreturn.size6+printreturn.size7+printreturn.size8+printreturn.size9+printreturn.size10) as pcs
    FROM printreturn as printreturn
    INNER JOIN orderdetail as orderdetail on printreturn.po = orderdetail.id
    INNER JOIN orders as orders on printreturn.orderid = orders.id
    INNER JOIN customer as customer on printreturn.customer = customer.id
    INNER JOIN other as other on other.code = printreturn.color
    WHERE printreturn.printdate <= ?
    GROUP BY printreturn.id
    `, [date],
    function(err, result) {
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
