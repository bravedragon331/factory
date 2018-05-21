var Const = require('../../config/const');
var Customer = require('../../models/customer');
var Others = require('../../models/other');
var Fabric = require('../../models/fabric');

var Order = require('../../models/order');
var OrderDetail = require('../../models/orderdetail');
var OrderFabric = require('../../models/orderfabric');

var ProductMaterialGroup = require('../../models/productmaterialgroup');
var FinishMaterialGroup = require('../../models/finishmaterialgroup');
var SubMaterial = require('../../models/submaterial');
var SizeGroup = require('../../models/sizegroup');

var Department = require('../../models/department');

exports.order_fabric = function(req, res){
    new Promise((resolve, reject)=>{
      Order.getOrder(req.body.name, req.body.buyer, function(err, rows){
        if(err){
          res.json({isSuccess: false});
          reject(err);
        }else{
          if(rows.length > 0){
            resolve(rows[0]);
          }else{
            res.json({isSuccess: false});
            reject();
          }
        }
      })
    }).then((order)=>{
      return new Promise((resolve, reject)=>{
        OrderFabric.getFabrics({id: order.id}, function(err,result){
          if(err){
            res.json({isSuccess: false});
            reject();
          }else{
            var fabrics = [], tmp = [];
            for(var i = 0; i < result.length; i++){
              if(!tmp.includes(result[i].fabriccode)){
                fabrics.push({id: result[i].fabriccode, name: result[i].fabriccodename});
                tmp.push(result[i].fabriccode);
              }
            }
            var ftypes = [], tmp = [];
            for(var i = 0; i < result.length; i++){
              if(!tmp.includes(result[i].fabrictypecode)){
                ftypes.push({id: result[i].fabrictypecode, name: result[i].fabrictypecodename});
                tmp.push(result[i].fabrictypecode);
              }
            }
            resolve({fabrics: fabrics, ftypes: ftypes});
          }
        })
      })
    }).then((fabrics)=>{
      res.json({isSuccess: true, fabrics: fabrics});
    })  
  }