var db = require('../models/db');

var create = function(body, callback){
  db.query(`INSERT INTO inspection (name, buyer, orderid, date, color, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12) values 
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.name, body.buyer, body.order, body.date, body.color, body.n1, body.n2, body.n3, 
      body.n4, body.n5, body.n6, body.n7, body.n8, body.n9, body.n10, body.n11, body.n12],
    function(err){
      if(err){
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
  db.query('SELECT * FROM inspection WHERE name = ? AND buyer = ? AND orderid = ? AND date = ? AND color = ?', [body.name, body.buyer, body.order, body.date, body.color], function(err, rows){
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
  db.query('SELECT * FROM inspection', [], function(err, rows){
    if(err){
      return callback(err);
    }else{
      return callback(null, rows);
    }
  })
}

var update = function(body, callback){
  db.query('UPDATE inspection SET ? WHERE name = ? AND buyer = ? AND orderid = ? AND date = ? AND color = ?', 
  [{name: body.name, buyer: body.buyer, orderid: body.order, date: body.date, color: body.color, n1: body.n1, n2: body.n2,
    n3: body.n3, n4: body.n4, n5: body.n5, n6: body.n6, n7: body.n7, n8: body.n8, n9: body.n9, n10: body.n10, n11: body.n11, n12: body.n12
  }, body.oldname, body.oldbuyer, body.oldorder, body.olddate, body.oldcolor], function(err, rows){
    if(err){
      return callback(err);
    }else {
      // No user exists, create the user
      return callback(null, true);
    }
  });
}

var getBeteenDate = function(body, callback){
  db.query('SELECT * FROM inspection WHERE date >= ? AND date <= ?', [body.startdate, body.enddate], function(err, rows){
    if(err){
      callback(err);
    }else{
      callback(null, rows);
    }
  })
}

var getByDay = function(body, callback){
  db.query('SELECT * FROM inspection WHERE date = ?', [body.date], function(err, rows){
    if(err){
      callback(err);
    }else{
      callback(null, rows);
    }
  })
}

var remove = function(body, callback){
  db.query('DELETE FROM inspection WHERE name = ? AND buyer = ? AND orderid = ? AND date = ? AND color = ?', [body.oldname, body.oldbuyer, body.oldorder, body.olddate, body.oldcolor], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })  
}

var getByDate = function(date, callback){
  db.query(
    `SELECT
      inspection.*, customer.name as buyer
      FROM inspection as inspection
      INNER JOIN customer as customer on inspection.buyer = customer.id
      WHERE inspection.date = ?`, [date], function(err, rows){
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
exports.remove = remove;
exports.getBeteenDate = getBeteenDate;
exports.getByDay = getByDay;
exports.getByDate = getByDate;