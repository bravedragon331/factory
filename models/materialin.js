  var db = require('./db');

var createProductMaterial = function(body, callback){
  db.query('INSERT INTO materialin (po, material, materialtype, size, ordernumber, loss, need, rcvd, date, customer, invoice, quantity) values (?,?,?,?,?,?,?,?,?,?,?,?)',
  [body.po, body.material, body.materialtype ,body.size, body.ordernumber, body.loss, body.need, body.rcvd, body.in_date, body.customer, body.invoice, body.quantity],
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
  db.query('SELECT * FROM materialin WHERE rcvd = ? AND po = ? AND material = ? AND materialtype = ?', [body.rcvd, body.po, body.material, body.materialtype], function(err, rows){
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
  db.query('UPDATE materialin SET ? WHERE rcvd = ? AND po = ? AND material = ? AND materialtype = ?', [body, body.rcvd, body.po, body.material, body.materialtype], function(err, rows){
    if(err){
      return callback(err);
    }else {
      // No user exists, create the user
      return callback(null, true);
    }
  });
}

var loadList = function(body, callback){
  var querystring = 'SELECT m.*, o.shipdate as shipdate, o.po as po, o.colorname as color, c.name as cname FROM materialin as m JOIN customer as c ON c.id = m.customer JOIN orderdetail as o ON o.id = m.po';
  var params = [];
  if(body.material){
    querystring +=  ' and m.material = ?';
    params.push(body.material);
  }
  if(body.material_type){
    querystring += ' and m.materialtype = ?';
    params.push(body.material_type);
  }
  if(body.style){
    querystring += ' and o.style = ?';
    params.push(body.style);
  }
  if(body.buyer){

  }
  if(body.po){
    querystring += ' and o.po = ?'
    params.push(body.po);
  }

  //db.query('SELECT m.*, o.shipdate as shipdate, o.po as po, o.colorname as color, c.name as cname FROM materialin as m JOIN orderdetail as o ON o.id = m.po and m.material = ? and m.materialtype = ? and o.style = ? JOIN customer as c ON c.id = m.customer',
  //[body.material, body.material_type, body.style], function(err, rows){
  db.query(querystring, params, function(err, rows){
    if(err){
      return callback(err);
    }
    else{
      return callback(null, rows);
    }
  });
}

var delete1 = function(body, callback){
  db.query('DELETE FROM materialin WHERE rcvd = ?', [body.rcvd], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var getAll = function(callback){
  db.query('SELECT m.*, od.style as style, od.po as po, od.shipdate as shipdate, od.color as color, o.buyer as buyer FROM materialin as m INNER JOIN orderdetail as od on m.po = od.id INNER JOIN orders as o on od.orderid = o.id', [], function(err, result){
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