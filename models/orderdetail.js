var db     = require('./db');

var createDetail = function(body, callback){
  console.log(body);
  db.query('INSERT INTO orderdetail (orderid, style, po, shipdate, color, colorname, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, body, trim, priority, priorityname) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
  [body.id, body.style, body.po, body.shipdate, body.color, body.colorname, body.s1, body.s2, body.s3, body.s4, body.s5, body.s6, body.s7, body.s8, body.s9, body.s10, 
   body.body, body.trim, body.priority, body.priorityname], 
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
    body: body.body, trim: body.trim, priority: body.priority, priorityname: body.priorityname}, body.id],
  function(err, result){
    if(err)
      return callback(err);
    return callback(null, true);
  })
}

var addDetail = function(body, callback){
  db.query('SELECT * FROM orderdetail WHERE style = ? AND po = ? AND orderid = ?', [body.style, body.po, body.id], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createDetail(body, callback);
    }
  });
}

var allDetail = function(body, callback){
  db.query('SELECT * FROM orderdetail WHERE style = ?', [body.style], function(err, rows) {
    if (err)
      return callback(err);
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

exports.addDetail = addDetail;
exports.allDetail = allDetail;
exports.getDetail = getDetail;
exports.updateDetail = updateDetail;
exports.removeDetail = removeDetail;
exports.all = all;