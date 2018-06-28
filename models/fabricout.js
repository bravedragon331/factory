var db = require('./db');

var create = function(body, callback){
  db.query('INSERT INTO fabricout (po, color, fabrictype, fabric, rcvd, kg, yds, roll, date, customer, rechazo, ret, bad, note) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  [body.po, body.color, body.fabrictype, body.fabric, body.rcvd, body.kg, body.yds, body.roll,
  body.date, body.customer, body.rechazo, body.return, body.bad, body.note],
  function(err){
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
  db.query('SELECT * FROM fabricout WHERE po = ? AND fabric = ? AND fabrictype = ? AND color = ? AND rcvd = ?', [body.po, body.fabric, body.fabrictype, body.color, body.rcvd], function(err, rows){
    if(err){
      return callback(err);
    }
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return create(body, callback);
    }
  });
}

var update = function(body, callback){
  db.query('UPDATE fabricout SET ? WHERE po = ? AND fabric = ? AND fabrictype = ? AND color = ? AND rcvd = ?', 
  [{po: body.po, color: body.color, fabrictype: body.fabrictype, fabric: body.fabric, rcvd: body.rcvd, kg: body.kg, yds: body.yds, roll: body.roll,
   date: body.date, customer: body.customer, rechazo: body.rechazo, ret: body.ret, bad: body.bad, note: body.note
  }, body.oldpo, body.fabric, body.oldfabrictype, body.oldcolor, body.rcvd], function(err, rows){
    if(err){
      return callback(err);
    }else {
      // No user exists, create the user
      return callback(null, true);
    }
  });
}

var get = function(body, callback){
  db.query(`SELECT f.*, o.po as po, o.colorname as color, of.width as width, of.weight as weight, other.name as fabrictype
            FROM fabricout as f
              INNER JOIN orderdetail as o on o.id = f.po
              INNER JOIN orders on orders.id = o.orderid
              INNER JOIN orderfabric as of on of.fabrictypecode = f.fabrictype and of.fabriccode = f.fabric
              INNER JOIN fabric as fc on of.fabriccode= fc.id
              INNER JOIN other on other.id = f.fabrictype
              WHERE f.fabric = ? and orders.name = ?
  `,
  [body.fabric, body.ordername], function(err, rows){
    if(err){
      return callback(err);
    }else {
      // No user exists, create the user
      var tmp = [], j;
      for(var i = 0; i < rows.length; i++){
        
        for(j = 0; j < tmp.length; j++){
          if(rows[i].id == tmp[j].id) break;
        }
        if(j == tmp.length){
          tmp.push(rows[i]);
        }        
      }
      return callback(null, tmp);
    }
  });
}

var getAll = function(callback){
  db.query(`SELECT f.*, o.style as style, o.po as po, orders.name as filename, orders.buyer as buyer
            FROM fabricout as f INNER JOIN orderdetail as o ON f.po = o.id INNER JOIN orders on orders.id = o.orderid`,[], 
  function(err, rows){
      if(err){
        return callback(err);
      }
      else{
        return callback(null, rows);
      }
  })
}

var getByDate = function(date, callback) {
  db.query(`SELECT fabricout.*, orders.name as order_name, orders.buyername as buyername, orderdetail.style as style, fabric.name as fabric, other.name as color, department.name as customer
            FROM fabricout as fabricout
            INNER JOIN orderdetail on fabricout.po = orderdetail.id
            INNER JOIN orders on orderdetail.orderid = orders.id
            INNER JOIN fabric as fabric on fabric.id = fabricout.fabric
            INNER JOIN other as other on other.code = fabricout.color
            INNER JOIN department as department on department.id = fabricout.customer
            WHERE fabricout.date <= ?
            GROUP BY fabricout.id
            `, [date],
    function(err, rows) {      
      if(err) callback(err);
      else callback(null, rows);
    }
  );
}

exports.add = add;
exports.update = update;
exports.get = get;
exports.getAll = getAll;
exports.getByDate = getByDate;