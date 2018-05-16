var db = require('../models/db');

var create = function(body, callback){
  db.query(`INSERT INTO sewhourly (line, buyer, orderid, date, qty, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12) values 
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.line, body.buyer, body.order, body.date, body.qty, body.n1, body.n2, body.n3, 
      body.n4, body.n5, body.n6, body.n7, body.n8, body.n9, body.n10, body.n11, body.n12],
    function(err){
      if(err){
        console.log(err);
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again
          return create(body, callback);
        }
        return callback(err);
      }
      return callback(null, true);
    }
  )
}

var add = function(body, callback){
  db.query('SELECT * FROM sewhourly WHERE line = ? AND buyer = ? AND orderid = ? AND date = ?', [body.line, body.buyer, body.order, body.date], function(err, rows){
    if(err){
      return callback(err);
    }else if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return create(body, callback);
    }
  })
}

var get = function(callback){
  db.query('SELECT * FROM sewhourly', [], function(err, rows){
    if(err){
      return callback(err);
    }else{
      return callback(null, rows);
    }
  })
}

var update = function(body, callback){
  console.log(body);
  db.query('UPDATE sewhourly SET ? WHERE line = ? AND buyer = ? AND orderid = ? AND date = ?', 
  [{line: body.line, buyer: body.buyer, orderid: body.order, date: body.date, qty: body.qty, n1: body.n1, n2: body.n2,
    n3: body.n3, n4: body.n4, n5: body.n5, n6: body.n6, n7: body.n7, n8: body.n8, n9: body.n9, n10: body.n10, n11: body.n11, n12: body.n12
  }, body.oldline, body.oldbuyer, body.oldorder, body.olddate], function(err, rows){
    if(err){
      console.log(err);
      return callback(err);
    }else {
      // No user exists, create the user
      return callback(null, true);
    }
  });
}

var getBeteenDate = function(body, callback){
  db.query('SELECT * FROM sewhourly WHERE date >= ? AND date <= ?', [body.startdate, body.enddate], function(err, rows){
    if(err){
      callback(err);
    }else{
      callback(null, rows);
    }
  })
}

var getByDay = function(body, callback){
  db.query('SELECT * FROM sewhourly WHERE date = ?', [body.date], function(err, rows){
    if(err){
      callback(err);
    }else{
      callback(null, rows);
    }
  })
}

exports.add = add;
exports.get = get;
exports.update = update;
exports.getBeteenDate = getBeteenDate;
exports.getByDay = getByDay;