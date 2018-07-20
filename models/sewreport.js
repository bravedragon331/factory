var db = require('./db');

var search1 = function(body, callback) {
  var q2 = 'HAVING', arr = [];
  if(body.buyer != '-1') {
    q2 += ' buyer = ? AND';
    arr.push(body.buyer);
  }
  if(body.order != '-1') {
    q2 += ' ordername = ? AND';
    arr.push(body.order);
  }
  if(body.color != '-1') {
    q2 += ' color = ? AND';
    arr.push(body.color);
  }
  if(body.style != '') {
    q2 += ' style = ? AND';
    arr.push(body.style);
  }
  var q = `
  SELECT
  orders.name AS ordername, orders.buyer as buyer, orders.buyername as buyername, GROUP_CONCAT(DISTINCT orderdetail.style) AS style, GROUP_CONCAT(DISTINCT orderdetail.po) AS po, orderdetail.colorname AS color,
  SUM(DISTINCT orderdetail.s1) AS t1, SUM(DISTINCT orderdetail.s2) AS t2, SUM(DISTINCT orderdetail.s3) AS t3,
  SUM(DISTINCT orderdetail.s4) AS t4, SUM(DISTINCT orderdetail.s5) AS t5, SUM(DISTINCT orderdetail.s6) AS t6,
  SUM(DISTINCT orderdetail.s7) AS t7, SUM(DISTINCT orderdetail.s8) AS t8, SUM(DISTINCT orderdetail.s9) AS t9, SUM(DISTINCT orderdetail.s10) AS t10,
  other1.name AS s_name1, other2.name AS s_name2, other3.name AS s_name3, other4.name AS s_name4, other5.name AS s_name5,
  other6.name AS s_name6, other7.name AS s_name7, other8.name AS s_name8, other9.name AS s_name9, other10.name AS s_name10,
  SUM(DISTINCT cut.size1) as c_size1, SUM(DISTINCT cut.size2) as c_size2, SUM(DISTINCT cut.size3) as c_size3,
  SUM(DISTINCT cut.size4) as c_size4, SUM(DISTINCT cut.size5) as c_size5, SUM(DISTINCT cut.size6) as c_size6,
  SUM(DISTINCT cut.size7) as c_size7, SUM(DISTINCT cut.size8) as c_size8, SUM(DISTINCT cut.size9) as c_size9, SUM(DISTINCT cut.size10) as c_size10
  FROM orderdetail AS orderdetail
  INNER JOIN orders AS orders ON orderdetail.orderid = orders.id
  INNER JOIN sizegroup AS sizegroup ON orders.sizegroup = sizegroup.id
  LEFT JOIN other AS other1 ON other1.id = sizegroup.size1
  LEFT JOIN other AS other2 ON other2.id = sizegroup.size2
  LEFT JOIN other AS other3 ON other3.id = sizegroup.size3
  LEFT JOIN other AS other4 ON other4.id = sizegroup.size4
  LEFT JOIN other AS other5 ON other5.id = sizegroup.size5
  LEFT JOIN other AS other6 ON other6.id = sizegroup.size6
  LEFT JOIN other AS other7 ON other7.id = sizegroup.size7
  LEFT JOIN other AS other8 ON other8.id = sizegroup.size8
  LEFT JOIN other AS other9 ON other9.id = sizegroup.size9
  LEFT JOIN other AS other10 ON other10.id = sizegroup.size10
  LEFT JOIN cut AS cut ON cut.orderid = orders.id AND cut.style = orderdetail.style AND cut.colorname = orderdetail.colorname
  GROUP BY ordername, color
  `;
  q = q+q2.substring(0, q2.lastIndexOf(" "));
  console.log(q);
  if(arr.length > 0) {
    db.query(q, arr, function(err, rows) {
      callback(err, rows);
    })
  } else {
    db.query(q, [], function(err, rows) {
      callback(err, rows);
    })
  }
}

var search2 = function(body, i, callback) {
  var q2 = ' HAVING', arr = [];
  if(body.buyer != '-1') {
    q2 += ' buyer = ? AND';
    arr.push(body.buyer);
  }
  if(body.order != '-1') {
    q2 += ' ordername = ? AND';
    arr.push(body.order);
  }
  if(body.color != '-1') {
    q2 += ' color = ? AND';
    arr.push(body.color);
  }
  if(body.style != '') {
    q2 += ' style = ? AND';
    arr.push(body.style);
  }
  var q = `
  SELECT
  orders.name AS ordername, orders.buyer as buyer, orders.buyername as buyername, GROUP_CONCAT(DISTINCT orderdetail.style) AS style, GROUP_CONCAT(DISTINCT orderdetail.po) AS po, orderdetail.colorname AS color,
  SUM(sewdaily.primeras) as sew_primeras, SUM(sewdaily.seg) as sew_seg, SUM(sewdaily.conf) as sew_conf, SUM(sewdaily.p_day) as sew_p_day, SUM(sewdaily.operation) as sew_operation
  FROM orderdetail AS orderdetail
  INNER JOIN orders AS orders ON orderdetail.orderid = orders.id
  INNER JOIN sizegroup AS sizegroup ON orders.sizegroup = sizegroup.id
  LEFT JOIN sewdaily as sewdaily ON sewdaily.po = orderdetail.id AND sewdaily.size = sizegroup.size${i}
  GROUP BY ordername, color
  `;
  q = q+q2.substring(0, q2.lastIndexOf(" "));
  if(arr.length > 0) {
    db.query(q, arr, function(err, rows) {
      callback(err, rows);
    })
  } else {
    db.query(q, [], function(err, rows) {
      callback(err, rows);
    })
  }
}


exports.search1 = search1;
exports.search2 = search2;