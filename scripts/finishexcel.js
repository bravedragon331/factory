var xlsx = require('node-xlsx');

var Other     = require('../models/other');
var Const = require('../config/const');
var Line = require('../models/line');
var Order = require('../models/order');
var OrderDetail = require('../models/orderdetail');
var Finish = require('../models/finish');

var finishExcel = function(path, orderid, callback){
  var lines, sizes, orders, orderdetails;

  new Promise((resolve, reject) => {
    Order.getAll(function(err, result){
      if(err){
        callback(err);
      } else {
        orders = result;
        resolve()
      }
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      OrderDetail.getAll(function(err, result){
        if(err){
          callback(err);
        } else {
          orderdetails = result;
          resolve();
        }
      })
    })
  }).then(() => {
    var exceldata = xlsx.parse(path)[0].data;    
    var fails = [];
    const preprocess = function(data){
      console.log(data);
      var tmp = [], order_n = -1, po_n = -1, size_n = 01;      
      for(var i = 0; i < orderdetails.length; i++){        
          if((orderdetails[i].orderid == orderid) && (orderdetails[i].po.toLowerCase() == data[1].toString().toLowerCase())
            && (orderdetails[i].colorname.toLowerCase() == data[2].toLowerCase()) && (orderdetails[i].style.toLowerCase() == data[0].toLowerCase()))
          {
            po_n = i;
            tmp.push(orderid);
            tmp.push(orderdetails[i].id);
            tmp.push(orderdetails[i].color);
            break;
          }
          if(po_n != -1) break;
      }      
      if(po_n == -1){
        tmp = [];
        return tmp;
      }
      tmp.push(data[3]);
      tmp.push(data[4]);
      tmp.push(data[5]);
      tmp.push(data[6]);
      tmp.push(data[7]);
      tmp.push(data[8]);
      tmp.push(data[9]);
      tmp.push(data[10]);
      tmp.push(data[11]);
      tmp.push(data[12]);
      return tmp;
    }
    const add = function(index){
      var tmp = preprocess(exceldata[index]);
      if(tmp.length == 0){
        fails.push(index);
        if(index < exceldata.length-1){
          add(index + 1);
        }else {
          callback(null, fails);
        }
      }else{        
        var data = {
          po: tmp[1], order: tmp[0], color: tmp[2], 
          size1: tmp[3], size2: tmp[4], size3: tmp[5], size4: tmp[6], size5: tmp[7], size6: tmp[8], size7: tmp[9], size8: tmp[10], size9: tmp[11], size10: tmp[12]
        };

        Finish.add(data, function(err, result){
          if(err){
            fails.push(index);
          } else {
            if(index < exceldata.length-1){
              add(index + 1);
            }else {
              callback(null, fails);
            }
          }
        })
      }
    }
    add(2);
  })
}

module.exports = finishExcel;