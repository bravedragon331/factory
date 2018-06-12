var db = require('./db');

var getAll1 = function(callback){
  db.query(
    `SELECT orderdetail.*, 
    (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) as orderdetail_pcs,
    (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) * orderdetail.body as orderdetail_yds,
    sum(fabricin.yds) as fabricin_yds, sum(fabricout.yds) as fabricout_yds,
    sum(cut.yds) as cut_yds, sum(cut.size1+cut.size2+cut.size3+cut.size4+cut.size5+cut.size6+cut.size7+cut.size8+cut.size9+cut.size10) as cut_pcs,
    sum(sew.primeras) as sew_pcs,
    sum(shipment.size1+shipment.size2+shipment.size3+shipment.size4+shipment.size5+shipment.size6+shipment.size7+shipment.size8+shipment.size9+shipment.size10) as shipment_pcs,
    sum(inspection.n1+inspection.n2+inspection.n3+inspection.n4+inspection.n5+inspection.n6+inspection.n7+inspection.n8+inspection.n9+inspection.n10) as inspection_pcs,    
    orders.buyer as buyer
    FROM orderdetail as orderdetail
    LEFT JOIN fabricin as fabricin ON fabricin.po = orderdetail.id
    LEFT JOIN fabricout as fabricout ON fabricout.po = orderdetail.id
    LEFT JOIN cut as cut ON cut.color = orderdetail.color AND cut.style = orderdetail.style AND cut.orderid = orderdetail.orderid
    LEFT JOIN sewdaily as sew ON sew.po = orderdetail.id
    LEFT JOIN shipment as shipment ON shipment.po = orderdetail.id
    LEFT JOIN inspection as inspection ON inspection.color = orderdetail.color AND inspection.orderid = orderdetail.orderid
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

var getAll2 = function(callback){
  db.query(
    `SELECT orderdetail.*, 
    (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) as orderdetail_pcs,
    (orderdetail.s1+orderdetail.s2+orderdetail.s3+orderdetail.s4+orderdetail.s5+orderdetail.s6+orderdetail.s7+orderdetail.s8+orderdetail.s9+orderdetail.s10) * orderdetail.body as orderdetail_yds,
    sum(fabricin.yds) as fabricin_yds, sum(fabricout.yds) as fabricout_yds,
    sum(cut.yds) as cut_yds, sum(cut.size1+cut.size2+cut.size3+cut.size4+cut.size5+cut.size6+cut.size7+cut.size8+cut.size9+cut.size10) as cut_pcs,
    sum(sew.primeras) as sew_pcs,
    sum(shipment.size1+shipment.size2+shipment.size3+shipment.size4+shipment.size5+shipment.size6+shipment.size7+shipment.size8+shipment.size9+shipment.size10) as shipment_pcs,
    sum(finish.size1+finish.size2+finish.size3+finish.size4+finish.size5+finish.size6+finish.size7+finish.size8+finish.size9+finish.size10) as finish_pcs,
    sum(sew.seg+sew.conf) as inventory_2nd,
    sum(printreturn.size1+printreturn.size2+printreturn.size3+printreturn.size4+printreturn.size5+printreturn.size6+printreturn.size7+printreturn.size8+printreturn.size9+printreturn.size10) as printreturn_pcs,
    washreturn.sum as washreturn_pcs,
    orders.buyer as buyer
    FROM orderdetail as orderdetail
    LEFT JOIN fabricin as fabricin ON fabricin.po = orderdetail.id
    LEFT JOIN fabricout as fabricout ON fabricout.po = orderdetail.id
    LEFT JOIN cut as cut ON cut.color = orderdetail.color AND cut.style = orderdetail.style AND cut.orderid = orderdetail.orderid
    LEFT JOIN sewdaily as sew ON sew.po = orderdetail.id
    LEFT JOIN shipment as shipment ON shipment.po = orderdetail.id
    LEFT JOIN finish as finish ON finish.po = orderdetail.id
    LEFT JOIN inspection as inspection ON inspection.color = orderdetail.color AND inspection.orderid = orderdetail.orderid
    LEFT JOIN printreturn as printreturn ON printreturn.po = orderdetail.id    
    LEFT JOIN (SELECT *, sum(size1+size2+size3+size4+size5+size6+size7+size8+size9+size10) as sum FROM washreturn GROUP BY washreturn.id) washreturn ON washreturn.po=orderdetail.id
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

exports.getAll1 = getAll1;
exports.getAll2 = getAll2;