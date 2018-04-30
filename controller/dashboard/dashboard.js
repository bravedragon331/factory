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

var Cut = require('../../models/cut');

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
    return new Promise((resolve, reject)=>{
      var r_orders = orderdetails.filter(v=>{
        for(let i = 0; i < orders.length; i++){
          if(orders[i].id == v.orderid){
            v.buyername = orders[i].buyername;
            var sum = 0;
            for(var k = 1; k < 11; k++){
              sum += v['s'+k];              
            }
            v.quantity = sum;
            v['cutquantity'] = 0;                        
            return true;
          }
        }
        return false;
      })
      resolve(r_orders);
    })        
  }).then((orderdetails)=>{    
    Cut.all(function(err, list){
      if(err){
        res.redirect('/');
      }else{        
        for(var j = 0; j < orderdetails.length; j++){            
          for(var i = 0; i < list.length; i++){
            if(list[i].po == orderdetails[j].id){
              orderdetails[j]['cut'] = true;
              var sum = 0;
              for(var k = 1; k < 11; k++){
                sum += Number(list[i]['size'+k]);
              }              
              orderdetails[j]['cutquantity'] += sum;
              if(sum != 0)
                orderdetails[j]['cutdate'] = list[i].cutdate;
            }
          }
        }
        //console.log(orderdetails);
        res.render('dashboard/index', {orders: orderdetails, role: res.role});
      }
    })
  })
}