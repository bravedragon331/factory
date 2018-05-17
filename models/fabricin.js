var db = require('./db');

var create = function(body, callback){
  console.log(body)
  db.query('INSERT INTO fabricin (po, color, fabrictype, fabric, rcvd, kg, yds, roll, lote, rack, date, customer, rechazo, ret, bad, note) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  [body.po, body.color, body.fabrictype, body.fabric, body.rcvd, body.kg, body.yds, body.roll, body.lote, body.rack,
  body.date, body.customer, body.rechazo, body.return, body.bad, body.note],
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
  })
}

var add = function(body, callback){
  db.query('SELECT * FROM fabricin WHERE po = ? AND fabric = ? AND fabrictype = ? AND color = ? AND rcvd = ?', [body.po, body.fabric, body.fabrictype, body.color, body.rcvd], function(err, rows){
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
  db.query('UPDATE fabricin SET ? WHERE po = ? AND fabric = ? AND fabrictype = ? AND color = ? AND rcvd = ?', 
  [{po: body.po, color: body.color, fabrictype: body.fabrictype, fabric: body.fabric, rcvd: body.rcvd, kg: body.kg, yds: body.yds, roll: body.roll,lote: body.lote,
    rack: body.rack, date: body.date, customer: body.customer, /*rib: body.rib,*/ rechazo: body.rechazo, ret: body.ret, bad: body.bad, note: body.note
  }, body.oldpo, body.fabric, body.oldfabrictype, body.oldcolor, body.rcvd], function(err, rows){
    if(err){
      console.log(err);
      return callback(err);
    }else {
      // No user exists, create the user
      return callback(null, true);
    }
  });
}

var get = function(body, callback){
  db.query(`SELECT f.*, o.po as po, o.colorname as color, of.width as width, of.weight as weight, other.name as fabrictype
            FROM fabricin as f
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
  db.query('SELECT f.*, o.style as style FROM fabricin as f INNER JOIN orderdetail as o ON f.po = o.id', [], function(err, rows){
  //   db.query(`SELECT f.*, o.style as style
  //           FROM fabricin as f
  //             INNER JOIN orderdetail as o on o.id = f.po
  //             INNER JOIN orders on orders.id = o.orderid
  //             INNER JOIN orderfabric as of on of.fabrictypecode = f.fabrictype and of.fabriccode = f.fabric
  //             INNER JOIN fabric as fc on of.fabriccode= fc.id
  //             INNER JOIN other on other.id = f.fabrictype
  // `, [], function(err, rows){
    if(err){
      return callback(err);
    }
    else{
      return callback(null, rows);
    }
  })
}

exports.add = add;
exports.update = update;
exports.get = get;
exports.getAll = getAll;