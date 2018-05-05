var db = require('./db');

var createProductMaterial = function(body, callback){
  db.query(`INSERT INTO materialout (po, material, materialtype, code, size, ordernumber, loss, need,
    rcvd, date, department, invoice, prepack, quantity, textura, mts, note) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  [body.po, body.material, body.materialtype, body.code, body.size, body.ordernumber, body.loss, body.need,
  body.rcvd, body.in_date, body.customer, body.invoice, body.prepack, body.quantity, body.textura, body.mts, body.note],
  function(err){
    if(err){
      if (err.code === 'ER_DUP_ENTRY') {
        // If we somehow generated a duplicate user id, try again
        return createProductMaterial(body, callback);
      }
      return callback(err);
    }
    return callback(null, true);
  })
}

var addMaterial = function(body, callback){
  db.query('SELECT * FROM materialout WHERE rcvd = ? AND po = ? AND material = ? AND materialtype = ? AND size = ?', [body.rcvd, body.po, body.material, body.materialtype, body.size], function(err, rows){
    if(err){
      return callback(err);
    }
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createProductMaterial(body, callback);
    }
  });
}

var updateMaterial = function(body, callback){
  //db.query('UPDATE materialout SET ? WHERE rcvd = ? AND po = ? AND material = ? AND materialtype = ?', [body, body.rcvd, body.po, body.material, body.materialtype], function(err, rows){
  db.query('UPDATE materialout SET ? WHERE rcvd = ? AND po = ? AND material = ? AND materialtype = ? AND size = ?', 
    [{po: body.po, code: body.code, size: body.size, ordernumber: body.ordernumber, loss: body.loss, 
      need: body.need, rcvd: body.rcvd, date: body.date, department: body.customer, invoice: body.invoice,
      prepack: body.prepack, quantity: body.quantity, textura: body.textura, mts: body.mts, note: body.note}, 
      body.oldrcvd, body.oldpo, body.material, body.materialtype, body.oldsize], function(err, rows){
    if(err){
      return callback(err);
    }else {
      // No user exists, create the user
      return callback(null, true);
    }
  });
}

var loadList = function(body, callback){
  db.query('SELECT m.*, o.shipdate as shipdate, o.po as po, o.colorname as color, c.name as cname FROM materialout as m INNER JOIN orderdetail as o ON o.id = m.po and m.material = ? and m.materialtype = ? LEFT JOIN department as c ON c.id = m.department',
  [body.material, body.material_type], function(err, rows){
    if(err){
      return callback(err);
    }
    else{
      return callback(null, rows);
    }
  });
}

var delete1 = function(body, callback){
  db.query('DELETE FROM materialout WHERE rcvd = ? AND po = ?', [body.rcvd, body.po], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var getAll = function(callback){
  db.query('SELECT m.*, od.style as style, od.po as po, od.shipdate as shipdate, od.color as color, o.buyer as buyer, oth.name as size FROM materialout as m INNER JOIN orderdetail as od on m.po = od.id INNER JOIN orders as o on od.orderid = o.id INNER JOIN other as oth on oth.id = m.size', [], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null, result);
    }
  })
}

exports.addMaterial = addMaterial;
exports.updateMaterial = updateMaterial;
exports.loadList = loadList;
exports.delete1 = delete1;
//Material Status
exports.getAll = getAll;