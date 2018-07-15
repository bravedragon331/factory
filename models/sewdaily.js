var db = require('./db');

var create = function(body, callback){
  db.query('INSERT INTO sewdaily (po, line, size, date, invoice, letra, primeras, seg, conf, p_day, operation) values (?,?,?,?,?,?,?,?,?,?,?)',
    [body.po, body.line, body.size, body.date, body.invoice, body.letra, body.primeras, body.seg, body.conf, body.p_day, body.operation],
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
  db.query('SELECT * FROM sewdaily WHERE po = ? AND line = ? AND size = ? AND date = ? AND letra = ?', [body.po, body.line, body.size, body.date, body.letra], function(err, rows){
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
  db.query('SELECT s.*, o.*, other.name as size FROM sewdaily as s INNER JOIN orderdetail as o ON s.po = o.id INNER JOIN other ON other.id = s.size', [], function(err, rows){
    if(err){
      return callback(err);
    }else{
      return callback(null, rows);
    }
  })
}

var update = function(body, callback){
  db.query('UPDATE sewdaily SET ? WHERE po = ? AND line = ? AND size = ? AND date = ? AND letra = ?', 
  [{po: body.po, line: body.line, size: body.size, invoice: body.invoice,
    letra: body.letra, primeras: body.primeras, seg: body.seg, conf: body.conf,
    p_day: body.p_day, operation: body.operation
  }, body.oldpo, body.oldline, body.oldsize, body.olddate, body.oldletra], function(err, rows){
    if(err){
      return callback(err);
    }else {
      // No user exists, create the user
      return callback(null, true);
    }
  });
}

var list = function(body, callback){
  db.query('SELECT s.* FROM sewdaily as s INNER JOIN orderdetail as o ON s.po = o.id and o.orderid = ?', [body.orderid], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var remove = function(body, callback){
  db.query('DELETE FROM sewdaily WHERE po = ? AND line = ? AND size = ? AND date = ? AND letra = ?', [body.oldpo, body.oldline, body.oldsize, body.olddate, body.oldletra], function(err, result){
    if(err){      
      return callback(err);
    }else{
      return callback(null);
    }
  })  
}

exports.add = add;
exports.get = get;
exports.update = update;
exports.remove = remove;
exports.list = list;
