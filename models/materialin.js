var db = require('./db');

var createProductMaterial = function(body, callback){
  db.query(`INSERT INTO materialin (po, material, materialtype, code, size, ordernumber, loss, need,
    rcvd, prepack, date, customer, invoice, quantity, textura, mts, note) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  [body.po, body.material, body.materialtype, body.code, body.size, body.ordernumber, body.loss, body.need,
  body.rcvd, body.prepack, body.date, body.customer, body.invoice, body.quantity, body.textura, body.mts, body.note],
  function(err){
    if(err){
      console.log(err);
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
  console.log(body);
  db.query('SELECT * FROM materialin WHERE rcvd = ? AND po = ? AND material = ? AND materialtype = ? AND size = ?', [body.rcvd, body.po, body.material, body.materialtype, body.size], function(err, rows){
    if(err){
      console.log(err);
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
  console.log(body);
  db.query('UPDATE materialin SET ? WHERE rcvd = ? AND po = ? AND material = ? AND materialtype = ? AND size = ?', 
  [{po: body.po, size: body.size, code: body.code, ordernumber: body.ordernumber, loss: body.loss, 
    need: body.need, rcvd: body.rcvd, date: body.date, customer: body.customer, invoice: body.invoice,
    prepack: body.prepack, quantity: body.quantity, textura: body.textura, mts: body.mts, note: body.note}, 
    body.oldrcvd, body.oldpo, body.material, body.materialtype, body.oldsize], function(err, rows){
    if(err){
      console.log(err);
      return callback(err);
    }else {
      // No user exists, create the user
      return callback(null, true);
    }
  });
}

var loadList = function(body, callback){
  var querystring = 'SELECT m.*, o.shipdate as shipdate, o.po as po, o.colorname as color, c.name as cname FROM materialin as m LEFT JOIN customer as c ON c.id = m.customer INNER JOIN orderdetail as o ON o.id = m.po INNER JOIN orders as od ON od.id = o.orderid';
  var params = [];
  if(body.material){
    querystring +=  ' and m.material = ?';
    params.push(body.material);
  }
  if(body.material_type){
    querystring += ' and m.materialtype = ?';
    params.push(body.material_type);
  }
  if(body.size){
    querystring += ' and m.size = ?';
    params.push(body.size);
  }
  if(body.ordername){
    querystring += ' and od.name = ?';
    params.push(body.ordername);
  }
  if(body.buyer){
    querystring += ' and od.buyername = ?'
    params.push(body.buyer);
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
  db.query('DELETE FROM materialin WHERE rcvd = ? AND po = ? AND size = ?', [body.rcvd, body.po, body.size], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var getAll = function(callback){
  db.query('SELECT m.*, od.style as style, od.po as po, od.shipdate as shipdate, od.color as color, o.buyer as buyer, oth.name as size FROM materialin as m INNER JOIN orderdetail as od on m.po = od.id INNER JOIN orders as o on od.orderid = o.id INNER JOIN other as oth on oth.id = m.size', [], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null, result);
    }
  })
}

var getByDate = function(date, callback) {
  db.query(`
    SELECT
      materialin.*, orders.name as order_name, orders.buyername as buyername, orderdetail.style as style,
      submaterial.name as material, customer.name as customer
    FROM materialin as materialin
    INNER JOIN orderdetail as orderdetail on orderdetail.id = materialin.po
    INNER JOIN orders as orders on orders.id = orderdetail.orderid
    INNER JOIN submaterial as submaterial on materialin.material = submaterial.id
    INNER JOIN customer as customer on customer.id = materialin.customer
    WHERE materialin.date <= ?
    GROUP BY materialin.id
  `, [date],
    function(err, result) {
      console.log(err);
      if(err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    }
  )
}

exports.addMaterial = addMaterial;
exports.updateMaterial = updateMaterial;
exports.loadList = loadList;
exports.delete1 = delete1;
//Material Status
exports.getAll = getAll;
exports.getByDate = getByDate;