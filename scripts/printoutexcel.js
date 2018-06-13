var xlsx = require('node-xlsx');

var Other     = require('../models/other');
var Const = require('../config/const');
var Line = require('../models/line');
var Order = require('../models/order');
var OrderDetail = require('../models/orderdetail');
var PrintOut = require('../models/printout');
var Customer = require('../models/customer');

var shipmentExcel = function(path, orderid, callback){
  console.log(orderid);
  var lines, sizes, orders, orderdetails, customers, customer;

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
    return new Promise((resolve, reject) =>{
      //Customer Type 6
      Other.getOthers({type: Const.codes[6].name}, function(err, type){
        if(err){
          callback(err);
        }else{          
          customer = type.filter(v => {
            // Const.customertype[2].name = Printing
            return v.name == Const.customertype[6].name;
          });
          resolve();
        }
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      Customer.list(function(err, list){
        if(err){
          callback(err);
        }else{          
          customers = list.filter(v => {
            return v.type == customer[0].id;
          })
          resolve();
        }
      })
    })
  }).then(() => {
    var exceldata = xlsx.parse(path)[0].data;    
    var fails = [];
    const preprocess = function(data){
      //console.log(orderid);
      var tmp = [], order_n = -1, po_n = -1, size_n = 01;      
      for(var i = 0; i < orderdetails.length; i++){        
          if((orderdetails[i].orderid == orderid) && (orderdetails[i].po.toLowerCase() == data[0].toString().toLowerCase())
            && (orderdetails[i].colorname.toLowerCase() == data[2].toLowerCase()))
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
      tmp.push(data[1]);
      var b = true;
      for(var i = 0; i < customers.length; i++) {
        if(customers[i].name.toLowerCase() == data[3].toLowerCase()) {
          tmp.push(customers[i].id);
          b = false;
          break;
        }
      }
      if(b) {
        tmp = [];
        return tmp;
      }
      tmp.push(data[4]);
      tmp.push(data[5]);
      tmp.push(data[6]);
      tmp.push(data[7]);
      tmp.push(data[8]);
      tmp.push(data[9]);
      tmp.push(data[10]);
      tmp.push(data[11]);
      tmp.push(data[12]);
      tmp.push(data[13]);
      tmp.push(data[14]);
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
        var myDate = new Date((Number(tmp[3]) - (25567 + 1))*86400*1000);
        var data = {
          po: tmp[1], order: tmp[0], color: tmp[2], printdate: myDate.getFullYear() + "-" + (myDate.getMonth() + 1 < 10? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1 ) + "-" + (myDate.getDate()<10?'0'+(myDate.getDate()): (myDate.getDate())),
          customer: tmp[4], invoice: tmp[5], size1: tmp[6], size2: tmp[7], size3: tmp[8], size4: tmp[9], size5: tmp[10], size6: tmp[11], size7: tmp[12], size8: tmp[13], size9: tmp[14], size10: tmp[15]
        };

        PrintOut.add(data, function(err, result){
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

module.exports = shipmentExcel;