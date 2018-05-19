var xlsx = require('node-xlsx');

var Other     = require('../models/other');
var Const = require('../config/const');
var Line = require('../models/line');
var Order = require('../models/order');
var OrderDetail = require('../models/orderdetail');
var SewDaily = require('../models/sewdaily');

var sewExcel = function(path, callback){
  var lines, sizes, orders, orderdetails;

  new Promise((resolve, reject) => {
    Line.allLine(function(err, result){
      if(err){
        callback(err);
      }else{
        lines = result;
        resolve();
      }
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      Other.getOthers({type: Const.codes[7].name}, function(err, result){
        if (err) {
          callback(err);
        } else {
          sizes = result;
          resolve();
        }
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      Order.getAll(function(err, result){
        if(err){
          callback(err);
        } else {
          orders = result;
          resolve()
        }
      })
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
    var fail_count = 0;
    const preprocess = function(data){
      var tmp = [], order_n = -1, line_n = -1, po_n = -1, size_n = 01;;
      for(var i = 0; i < lines.length; i++){
        if(lines[i].name == data[1]){
          line_n = i;
          tmp.push(lines[i].id);
          break;
        }
      }
      if(line_n == -1) return tmp;
      for(var i = 0; i < orders.length; i++){
        if(orders[i].name == data[2]){
          order_n = orders[i].id;
          break;
        }
      }
      if(order_n == -1){
        tmp = [];
        return tmp;
      }
      for(var i = 0; i < orderdetails.length; i++){
        if((orderdetails[i].orderid.toString() == order_n.toString()) && (orderdetails[i].po.toString() == data[3].toString())
        && (orderdetails[i].colorname.toString() == data[4].toString())){
          po_n = i;
          tmp.push(orderdetails[i].id);
          break;
        }
      }
      if(po_n == -1){
        tmp = [];
        return tmp;
      }
      for(var i = 0; i < sizes.length; i++) {
        if(sizes[i].name == data[5]) {
          size_n = i;
          tmp.push(sizes[i].id);
          break;          
        }
      }
      if(size_n == -1){
        tmp = [];
        return tmp;
      }
      tmp.push(data[0]);
      tmp.push(data[6]);
      tmp.push(data[7]);
      tmp.push(data[8]);
      tmp.push(data[9]);
      tmp.push(data[10]);
      return tmp;
    }
    const add = function(index){
      var tmp = preprocess(exceldata[index]);
      if(tmp.length == 0){
        fail_count ++;
        if(index < exceldata.length-1){
          add(index + 1);
        }else {
          callback(null, fail_count);
        }
      }else{
        console.log(tmp);
        var myDate = new Date((Number(tmp[3]) - (25567 + 1))*86400*1000);
        var data = {
          po: tmp[1], line: tmp[0], size: tmp[2], date: myDate.getFullYear() + "-" + (myDate.getMonth() + 1 < 10? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1 ) + "-" + (myDate.getDate()<10?'0'+(myDate.getDate()): (myDate.getDate())),
          invoice: tmp[4], letra: tmp[5], primeras: tmp[6], seg: tmp[7], conf: tmp[8]
        }
        SewDaily.add(data, function(err, result){
          if(err){
            fail_count ++;
          } else {
            if(index < exceldata.length-1){
              add(index + 1);
            }else {
              callback(null, fail_count);
            }
          }
        })
      }      
    }
    add(1);
  })
}

module.exports = sewExcel;