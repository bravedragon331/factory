var db = require('./db');

var createDetail = function(body, callback){
  db.query('INSERT INTO orderdetail (orderid, style, po, shipdate, color, colorname, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, body, trim, otra1, otra2, priority, priorityname, work, unit, f1, f2, f3, f4, f5) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  [body.id, body.style, body.po, body.shipdate, body.color, body.colorname, body.s1, body.s2, body.s3, body.s4, body.s5, body.s6, body.s7, body.s8, body.s9, body.s10, 
   body.body, body.trim, body.otra1, body.otra2, body.priority, body.priorityname, body.work, body.unit, body.f1, body.f2, body.f3, body.f4, body.f5], 
  function(err){
    if(err){
      if (err.code === 'ER_DUP_ENTRY') {
        // If we somehow generated a duplicate user id, try again
        return createDetail(body, callback);
      }
      return callback(err);
    }
    return callback(null, true);
  })
}

var updateDetail = function(body, callback){
  db.query('UPDATE orderdetail SET ? WHERE id = ?', 
  [{style: body.style, po: body.po, shipdate: body.shipdate, color: body.color, colorname: body.colorname, s1: body.s1, s2: body.s2, s3: body.s3, 
    s4: body.s4, s5: body.s5, s6: body.s6, s7: body.s7, s8: body.s8, s9: body.s9, s10: body.s10, 
    body: body.body, trim: body.trim, otra1: body.otra1, otra2: body.otra2, priority: body.priority, priorityname: body.priorityname, work: body.work, unit: body.unit,
    f1: body.f1, f2: body.f2, f3: body.f3, f4: body.f4, f5: body.f5}, body.id],
  function(err, result){
    if(err)
      return callback(err);
    return callback(null, true);
  })
}

var addDetail = function(body, callback){
  db.query('SELECT * FROM orderdetail WHERE po = ? AND orderid = ? AND color = ?', [body.po, body.id, body.color], function(err, rows) {
    if (err){
      console.log(err);
      return callback(err);
    }
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createDetail(body, callback);
    }
  });
}

var allDetail = function(body, callback){
  db.query('SELECT d.*, o.sizegroup FROM orderdetail as d INNER JOIN orders as o ON d.orderid=o.id and d.orderid = ?', [body.id], function(err, rows) {
    if (err){
      console.log(err);
      return callback(err);
    }
    else{
      return callback(null, rows);
    }
  });
}

var allDetailByOrderName = function(body, callback){
  db.query('SELECT d.*, o.sizegroup, o.materialmargin as loss FROM orderdetail as d INNER JOIN orders as o ON d.orderid=o.id and o.name = ?', [body.ordername], function(err, rows) {
    if (err){
      console.log(err);
      return callback(err);
    }
    else{
      return callback(null, rows);
    }
  });
}

var all = function(callback){
  db.query('SELECT * FROM orderdetail', [], function(err, rows) {
    if (err)
      return callback(err);
    else{
      return callback(null, rows);
    }
  });
}

var getDetail = function(body, callback){
  db.query('SELECT * FROM orderdetail WHERE id = ?', [body.id], function(err, rows) {
    if (err)
      return callback(err);
    else{
      return callback(null, rows);
    }
  });
}

var removeDetail = function(id, callback){
  db.query('DELETE FROM orderdetail WHERE id = ?', [id], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var getByOrderIDCOLOR = function(id, color, callback){
  db.query('SELECT * FROM orderdetail WHERE orderid = ? AND color = ?', [id, color], function(err, rows){
    if(err)
      return callback(err);
    else{
      return callback(null, rows);
    }
  })
}

var getByOrderIDPO = function(id, po, callback){
  db.query('SELECT * FROM orderdetail WHERE orderid = ? AND po = ?', [id, po], function(err, rows){
    if(err)
      return callback(err);
    else{
      return callback(null, rows);
    }
  })
}

var getAll = function(callback){
  db.query('SELECT d.*, o.buyer FROM orderdetail as d INNER JOIN orders as o ON d.orderid=o.id', [], function(err, rows) {
    if (err){
      console.log(err);
      return callback(err);
    }
    else{
      return callback(null, rows);
    }
  });
}

var getByOrderID = function(id, callback){
  db.query('SELECT * FROM orderdetail WHERE orderid = ?', [id], function(err, rows){
    if(err)
      return callback(err);
    else{
      return callback(null, rows);
    }
  })
}

exports.addDetail = addDetail;
exports.allDetail = allDetail;
exports.getDetail = getDetail;
exports.updateDetail = updateDetail;
exports.removeDetail = removeDetail;
exports.all = all;
exports.getByOrderIDCOLOR = getByOrderIDCOLOR;
exports.getByOrderIDPO = getByOrderIDPO;
exports.getByOrderID = getByOrderID;
exports.getAll = getAll;
exports.allDetailByOrderName = allDetailByOrderName;