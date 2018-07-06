var db = require('./db');

var getAll = function(callback) {
  db.query(`
    SELECT  orders.buyername AS buyer,
            shipment.date AS date,
            COUNT(DISTINCT orderdetail.style) AS style,
            (sewdaily.primeras) AS primeras,
            (sewdaily.seg) AS seg,
            (sewdaily.conf) AS conf,
            (shipment.size1+shipment.size2+shipment.size3+shipment.size4+shipment.size5+shipment.size6+shipment.size7+shipment.size8+shipment.size9+shipment.size10) AS shipment            
    FROM orders AS orders
    LEFT JOIN orderdetail AS orderdetail ON orderdetail.orderid = orders.id
    LEFT JOIN sewdaily AS sewdaily ON sewdaily.po = orderdetail.id
    LEFT JOIN shipment AS shipment ON shipment.orderid = orders.id
    GROUP BY orders.buyername, shipment.date
  `, [], function(err, rows) {
    callback(err, rows);
  })
}

exports.getAll = getAll;