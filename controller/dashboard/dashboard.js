var User = require('../../models/user');
var Customer = require('../../models/customer');
var Others = require('../../models/other');
var Yarn = require('../../models/yarn');
var Fabric = require('../../models/fabric');
var Const = require('../../config/const');
var SizeGroup = require('../../models/sizegroup');
var ProductMaterialGroup = require('../../models/productmaterialgroup');
var FinishMaterialGroup = require('../../models/finishmaterialgroup');

var Order = require('../../models/order');
var OrderFabrics = require('../../models/orderfabric');
var OrderDetail = require('../../models/orderdetail');

exports.index = function(req, res){
  var orderdetails, orders;
  new Promise((resolve, reject) => {
    OrderDetail.all(function(err, result){
      if(err){
        res.redirect('/');
      }else{
        orderdetails = result;
        resolve(orderdetails);
      }
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      Order.getAll(function(err, result){
        if(err){
          res.redirect('/');
        }else{
          orders = result;
          resolve(orders);
        }
      })
    })
  }).then(()=>{
    var r_orders = orderdetails.filter(v=>{
      for(let i = 0; i < orders.length; i++){
        if(orders[i].id == v.orderid){
          v.buyername = orders[i].buyername;
          v.quantity = orders[i].quantity;
          return true;
        }
      }
      return false;
    })
    res.render('dashboard/index', {orders: r_orders});
  })  
  
}