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
var PrintOut = require('../../models/printout');
var WashOut = require('../../models/washout');

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
            v['washquantity'] = 0;
            v['printquantity'] = 0;
            return true;
          }
        }
        return false;
      })
      resolve(r_orders);
    })        
  }).then((orderdetails)=>{
    return new Promise((resolve, reject) => {
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
          resolve(orderdetails);
        }
      })
    });    
  }).then((orderdetails)=>{
    return new Promise((resolve, reject) => {
      PrintOut.all(function(err, list){
        if(err){
          res.redirect('/');
        }else{
          for(var j = 0; j < orderdetails.length; j++){            
            for(var i = 0; i < list.length; i++){
              if(list[i].po == orderdetails[j].id){
                orderdetails[j]['print'] = true;
                var sum = 0;
                for(var k = 1; k < 11; k++){
                  sum += Number(list[i]['size'+k]);
                }              
                orderdetails[j]['printquantity'] += sum;
                if(sum != 0)
                  orderdetails[j]['printdate'] = list[i].printdate;
              }
            }
          }
          resolve(orderdetails);
        }
      })
    });
  }).then((orderdetails)=>{
    return new Promise((resolve, reject) => {
      WashOut.all(function(err, list){
        if(err){
          res.redirect('/');
        }else{
          for(var j = 0; j < orderdetails.length; j++){            
            for(var i = 0; i < list.length; i++){
              if(list[i].po == orderdetails[j].id){
                orderdetails[j]['wash'] = true;
                var sum = 0;
                for(var k = 1; k < 11; k++){
                  sum += Number(list[i]['size'+k]);
                }              
                orderdetails[j]['washquantity'] += sum;
                if(sum != 0)
                  orderdetails[j]['washdate'] = list[i].cutdate;
              }
            }
          }
          resolve(orderdetails);
        }
      })
    });
  }).then((orderdetails)=>{
    res.render('dashboard/index', {orders: orderdetails, role: res.role});
  })
}