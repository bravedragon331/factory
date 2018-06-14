var db     = require('./db');

var createOrder = function(body, callback){
  db.query(`INSERT INTO orders (date, handler, handlername, name, buyer, buyername, style, product, sizegroup, sizegroupname, productgroup, productgroupname, finishgroup, finishgroupname, season, quantity, amount, price, fabricmargin, materialmargin, sewmargin, complete) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
  [new Date(body.date), body.handler, body.handlername, body.name, body.buyer, body.buyername, body.style, body.product, body.sizegroup, body.sizegroupname, body.productgroup, body.productgroupname, body.finishgroup, body.finishgroupname, body.season, body.quantity, body.amount, body.price, body.fabricmargin, body.materialmargin, body.sewmargin, '0'], 
  function(err){
    if(err){
      if (err.code === 'ER_DUP_ENTRY') {
        // If we somehow generated a duplicate user id, try again
        return createOrder(body, callback);
      }
      return callback(err);
    }
    return callback(null, true);
  })
}

var addOrder = function(body, callback){
  db.query('SELECT * FROM orders WHERE name = ? AND buyer = ?', [body.name, body.buyer], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createOrder(body, callback);
    }
  });
}

var removeOrder = function(id, callback){
  db.query('DELETE FROM orders WHERE id = ?', [id], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var getAll = function(callback){
  db.query('SELECT * FROM orders', [], function(err, rows) {
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var getOrder = function(ordername, buyer, callback){
  db.query('SELECT * FROM orders WHERE name = ? AND buyername = ?', [ordername, buyer], function(err, rows) {
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var getOrderById = function(id, callback){
  db.query('SELECT * FROM orders WHERE id = ?', [id], function(err, rows) {
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var getBuyerCode = function(callback){
  db.query('SELECT * FROM other WHERE type1 = ? AND name = ?', ['Customer Type', 'Buyer'], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var addImage = function(id, filename, callback){
  db.query('SELECT * FROM orders WHERE id = ?', [id], function(err, rows) {
    if (err)
      return callback(err);
    else{
      var files = rows[0].files == null? '': rows[0].files;
      if(files != '')
        files += ','+filename;
      else
        files += filename;
      
      db.query('UPDATE orders SET ? WHERE id = ?', [{files: files}, id], function(err, result){
        if(err){
          return callback(err);
        }          
        else
          return callback(null, true);
      })
    }
  });
}

var UpdateImage = function(id, names, callback){
  db.query('UPDATE orders SET ? WHERE id = ?', [{files: names}, id], function(err, result){
    if(err){
      return callback(err);
    }          
    else
      return callback(null, true);
  })
}

var updateMaterialGroup = function(body, callback){  
  db.query('UPDATE orders SET ? WHERE id = ?', [
    {productgroup: body.pgroup, productgroupname: body.pname, finishgroup: body.fgroup, finishgroupname: body.fname, fabricmargin: body.fmargin, materialmargin: body.mmargin, sewmargin: body.smargin}, 
    body.id
  ], function(err, result){    
    if(err){
      return callback(err);
    }          
    else
      return callback(null, true);
  })
}

var order_update_2 = function(body, callback){
  db.query('UPDATE orders SET ? WHERE id = ?', [
    { product: body.product, season: body.season, quantity: body.qty, amount: body.amount, price: body.unit, style: body.style, complete: body.complete },
    body.id
  ], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null, true);
    }
  })
}

exports.addOrder = addOrder;
exports.removeOrder = removeOrder;
exports.addImage = addImage;
exports.getBuyerCode = getBuyerCode;
exports.getAll = getAll;
exports.getOrder = getOrder;
exports.getOrderById = getOrderById;
exports.UpdateImage = UpdateImage;
exports.updateMaterialGroup = updateMaterialGroup;
exports.order_update_2 = order_update_2;