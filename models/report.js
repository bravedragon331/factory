var db = require('./db');

var getAll = function(callback){
  db.query(
    `SELECT orderdetail.*, 
    (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) as orderdetail_pcs,
    (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) * orderdetail.body as orderdetail_yds,
    sum(fabricin.yds) as fabricin_yds, sum(fabricout.yds) as fabricout_yds,
    sum(cut.yds) as cut_yds, sum(cut.size1+cut.size2+cut.size3+cut.size4+cut.size5+cut.size6+cut.size7+cut.size8+cut.size9+cut.size10) as cut_pcs,
    sum(sew.primeras) as sew_pcs,
    sum(iron.size1+iron.size2+iron.size3+iron.size4+iron.size5+iron.size6+iron.size7+iron.size8+iron.size9+iron.size10) as iron_pcs,
    sum(inspection.segundas) as segundas,
    sum(inspection.defectos) as defectos,
    orders.buyer as buyer
    FROM orderdetail as orderdetail
    LEFT JOIN fabricin as fabricin ON fabricin.po = orderdetail.id
    LEFT JOIN fabricout as fabricout ON fabricout.po = orderdetail.id
    LEFT JOIN cut as cut ON cut.po = orderdetail.id
    LEFT JOIN sewdaily as sew ON sew.po = orderdetail.id
    LEFT JOIN iron as iron ON iron.po = orderdetail.id
    LEFT JOIN inspection as inspection ON inspection.po = orderdetail.id
    INNER JOIN orders as orders ON orders.id = orderdetail.orderid
    GROUP BY orderdetail.id
    `, 
    [], function(err, rows) {
    if (err){
      console.log(err);
      return callback(err);
    }
    else{
      return callback(null, rows);
    }
  });
}

exports.getAll = getAll;