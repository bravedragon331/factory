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

var SewHourly = require('../../models/sewhourly');
var Line = require('../../models/line');

/* For Dashboard2 */
var FabricIn = require('../../models/fabricin');
var FabricOut = require('../../models/fabricout');
var PrintReturn = require('../../models/printreturn');
var Shipment = require('../../models/shipment');
var Finish = require('../../models/finish');
var MaterialIn = require('../../models/materialin');
var MaterialOut = require('../../models/materialout');
var WashReturn = require('../../models/washreturn');
var Inspection = require('../../models/inspection');

exports.index = function(req, res){
  var orderdetails, orders, lines;
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
      Line.allLine(function(err, rows){
        if(err){
          lines = [];
          reject();
        }else{
          lines = rows;
          resolve();
        }
      })
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
          if((orders[i].id == v.orderid) && (orders[i].complete != 1)){
            v.buyername = orders[i].buyername;
            v.ordername = orders[i].name;
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
  //   return new Promise((resolve, reject) => {
  //     Cut.all(function(err, list){
  //       if(err){
  //         res.redirect('/');
  //       }else{
  //         for(var j = 0; j < orderdetails.length; j++){            
  //           for(var i = 0; i < list.length; i++){
  //             if(list[i].po == orderdetails[j].id){
  //               orderdetails[j]['cut'] = true;
  //               var sum = 0;
  //               for(var k = 1; k < 11; k++){
  //                 sum += Number(list[i]['size'+k]);
  //               }              
  //               orderdetails[j]['cutquantity'] += sum;
  //               if(sum != 0)
  //                 orderdetails[j]['cutdate'] = list[i].cutdate;
  //             }
  //           }
  //         }
  //         resolve(orderdetails);
  //       }
  //     })
  //   });    
  // }).then((orderdetails)=>{
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
    res.render('dashboard/index', {orders: orderdetails, role: res.role, lines: lines});
  })
}

exports.chartdata = function(req, res){
  var year = req.body.year;
  var month = req.body.month;
  if(month.length < 2) month = '0' + month;
  var startdate = year + '-' + month + '-' +  '01';
  var enddate = year + '-' + month + '-' + '31';
  SewHourly.getBeteenDate({ startdate: startdate, enddate: enddate }, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      const getDay = (dt) => {
        return Number(dt.slice(-2));
      }
      const getSum = (d) => {
        var sum = 0;
        for(var i = 1; i < 13; i++){
          sum += Number(d['n'+i]);          
        }
        return sum;
      }
      var data = {};
      for(var i = 0; i < result.length; i++){
        if(data[result[i].line] != undefined && data[result[i].line][getDay(result[i].date)] != undefined){
          data[result[i].line][getDay(result[i].date)] += getSum(result[i]);
        }else if(data[result[i].line] != undefined && data[result[i].line][getDay(result[i].date)] == undefined){
          data[result[i].line][getDay(result[i].date)] = getSum(result[i]);
        }else{
          data[result[i].line] = {};
          data[result[i].line][getDay(result[i].date)] = getSum(result[i]);
        }
      }
      res.json({isSuccess: true, data: JSON.stringify(data)});
    }
  })
}

exports.metadata = function(req, res){
  var year = req.body.year;
  var month = req.body.month;
  var day = req.body.day;
  if(month.length < 2) month = '0' + month;
  if(day.length < 2) day = '0' + day;
  //day = '04';
  var date = year + '-' + month + '-' + day;
  SewHourly.getByDay({date: date}, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      const getDay = (dt) => {
        return Number(dt.slice(-2));
      }
      const getSum = (d) => {
        var sum = 0;
        for(var i = 1; i < 13; i++){
          sum += Number(d['n'+i]);          
        }
        return sum;
      }
      var data = {}, dailymeta = 0, dailypro = 0;
      for(var i = 0; i < result.length; i++){
        //Get Data By Line
        if(data[result[i].line] != undefined && data[result[i].line][getDay(result[i].date)] != undefined){
          data[result[i].line]['sum'] += getSum(result[i]);
          data[result[i].line]['meta'] += Number(result[i].qty);
        }else if(data[result[i].line] != undefined && data[result[i].line][getDay(result[i].date)] == undefined){
          data[result[i].line]['sum'] = getSum(result[i]);
          data[result[i].line]['meta'] = Number(result[i].qty);
        }else{
          data[result[i].line] = {};
          data[result[i].line]['sum'] = getSum(result[i]);
          data[result[i].line]['meta'] = Number(result[i].qty);
        }
      }

      res.json({isSuccess: true, data: JSON.stringify(data)});
    }
  })
}

exports.avgdata = function(req, res){
  var year = req.body.year;
  var startdate = year + '-' + '01' + '-' +  '01';
  var enddate = year + '-' + '12' + '-' + '31';
  SewHourly.getBeteenDate({ startdate: startdate, enddate: enddate }, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{      
      var sum = 0;
      for(var i = 0; i < result.length; i++){
        sum += Number(result[i].qty);
      }
      res.json({isSuccess: true, avg: sum/result.length});
    }
  })
}

exports.dashboard2 = function(req, res) {
  var lines = [];
  new Promise((resolve, reject)=>{
    Line.allLine(function(err, rows){
      if(err){
        lines = [];
        reject();
      }else{
        lines = rows;
        resolve();
      }
    })
  }).then(()=>{
    res.render('dashboard/index2', {role: res.role, lines: lines});
  });  
}

exports.customer_fabric_data = function(req, res) {
  var date = req.body.date;
  var fabric = [];
  var fabricin_all = [], fabricout_all = [];
  new Promise((resolve, reject) => {
    FabricIn.getByDate(date, function(err, result) {
      if(err) {
        fabricin_all = [];
      } else {
        var tmp = [];
        for(var i = 0; i < result.length; i++) {
          if(result[i].date == date) {
            var sum = 0;
            result[i].total = 0;
            for(var k = 0; k < result.length; k++) {
              if((result[k].order_name == result[i].order_name) && (result[k].fabric == result[i].fabric) && (result[k].color == result[i].color)) {
                result[i].total += Number(result[k].yds);
              }
            }
            tmp.push(result[i]);
          }
        }
        fabricin_all = tmp;
      }
      resolve();
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      FabricOut.getByDate(date, function(err, result) {
        if(err) {
          fabricout_all = [];
        } else {
          var tmp = [];          
          for(var i = 0; i < result.length; i++) {
            if(result[i].date == date) {
              var sum = 0;
              result[i].total = 0;
              for(var k = 0; k < result.length; k++) {
                if((result[k].order_name == result[i].order_name) && (result[k].fabric == result[i].fabric) && (result[k].color == result[i].color)) {
                  result[i].total += Number(result[k].yds);                
                }
              }
              tmp.push(result[i]);
            }
          }
          fabricout_all = tmp;
        }
        resolve();
      })
    })
  })
  .then(() => {
    res.json({isSuccess: true, fabricin: fabricin_all, fabricout: fabricout_all});
  })
}

exports.customer_print_data = function(req, res) {
  var date = req.body.date;
  var printout_all = [], printreturn_all = [];
  new Promise((resolve, reject) => {
    PrintOut.getByDate(date, function(err, result) {
      if(err) {
        printout_all = [];
      } else {
        var tmp = [];
        for(var i = 0; i < result.length; i++) {
          if(result[i].printdate == date) {
            var sum = 0;
            result[i].total = 0;
            for(var k = 0; k < result.length; k++) {
              if((result[k].po == result[i].po) && (result[k].style == result[i].style) && (result[k].color == result[i].color)) {
                result[i].total += Number(result[k].pcs);
              }
            }
            tmp.push(result[i]);
          }
        }
        printout_all = tmp;
      }
      resolve();
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      PrintReturn.getByDate(date, function(err, result) {
        if(err) {
          printreturn_all = [];
        } else {
          var tmp = [];
          for(var i = 0; i < result.length; i++) {
            if(result[i].printdate == date) {
              var sum = 0;
              result[i].total = 0;
              for(var k = 0; k < result.length; k++) {
                if((result[k].po == result[i].po) && (result[k].style == result[i].style) && (result[k].color == result[i].color)) {
                  result[i].total += Number(result[k].pcs);
                }
              }
              tmp.push(result[i]);
            }
          }
          printreturn_all = tmp;
        }
        resolve();
      })
    })    
  }).then(() => {
    res.json({isSuccess: true, printout: printout_all, printreturn: printreturn_all});
  })
}

exports.customer_cut_data = function(req, res) {
  Cut.getByDate(req.body.date, function(err, result) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      var tmp = [];
      for(var i = 0; i < result.length; i++) {
        if(result[i].cutdate == req.body.date) {
          var sum = 0;
          result[i].total = 0;
          var yds = 0;
          var b = false;
          for(var j = 0; j < tmp.length; j++) {
            if((tmp[j].fabric == result[i].fabric) && ((tmp[j].style == result[i].style)) && (tmp[j].color == result[i].color)) {
              b = true;
            }
          }
          if(b == true) continue;
          for(var k = 0; k < result.length; k++) {
            if((result[k].fabric == result[i].fabric) && (result[k].style == result[i].style) && (result[k].color == result[i].color)) {
              result[i].total += Number(result[k].orderdetail_yds);
              yds += Number(result[k].yds);
            }
          }
          result[i].yds = yds;
          result[i].total = result[i].total/12;
          tmp.push(result[i]);
        }
      }
      res.json({isSuccess: true, cut_data: tmp});
    }
  })
}

exports.customer_shipment_data = function(req, res) {
  var sizes;
  new Promise((resolve, reject) => {
    Others.getOthers({type: 'Size'}, function(err, result) {
      if(err) {
        res.json({isSuccess: false});
      } else {
        sizes = result;
        resolve();
      }
    })
  }).then(() => {
    Shipment.getByDateRange(req.body.startdate, req.body.enddate, function(err, result) {
      if(err) {
        res.json({isSuccess: false});
      } else {
        res.json({isSuccess: true, shipment_data: result, sizes: sizes});
      }
    })
  })  
}

exports.customer_finish_data = function(req, res) {
  var sizes;
  new Promise((resolve, reject) => {
    Others.getOthers({type: 'Size'}, function(err, result) {
      if(err) {
        res.json({isSuccess: false});
      } else {
        sizes = result;
        resolve();
      }
    })
  }).then(() => {
    Finish.getByDate(req.body.date, function(err, result) {
      if(err) {
        res.json({isSuccess: false});
      } else {
        res.json({isSuccess: true, finish_data: result, sizes: sizes});
      }
    })
  })  
}

exports.customer_material_data = function(req, res) {
  var material_in, material_out
  new Promise((resolve, reject) => {
    MaterialIn.getByDate(req.body.date, function(err, result) {
      if(err) {
        res.json({isSuccess: false});
      } else {
        var tmp = [];
        for(var i = 0; i < result.length; i++) {
          if(result[i].date == req.body.date) {
            var sum = 0;
            result[i].total = 0;
            for(var k = 0; k < result.length; k++) {
              if((result[k].order_name == result[i].order_name) && (result[k].material == result[i].material) && (result[k].color == result[i].color)) {
                result[i].total += Number(result[k].quantity);
              }
            }
            tmp.push(result[i]);
          }
        }
        material_in = tmp;
        resolve();
      }
    })
  }).then(()  => {
    return new Promise((resolve, reject) => {
      MaterialOut.getByDate(req.body.date, function(err, result) {
        if(err) {
          res.json({isSuccess: false});
        } else {
          var tmp = [];
          for(var i = 0; i < result.length; i++) {
            if(result[i].date == req.body.date) {
              var sum = 0;
              result[i].total = 0;
              for(var k = 0; k < result.length; k++) {
                if((result[k].order_name == result[i].order_name) && (result[k].material == result[i].material) && (result[k].color == result[i].color)) {
                  result[i].total += Number(result[k].quantity);
                }
              }
              tmp.push(result[i]);
            }
          }
          material_out = tmp;
          resolve();
        }
      })
    })    
  }).then(() => {
    res.json({isSuccess: true, material_in: material_in, material_out: material_out});
  })
}

exports.customer_wash_data= function(req, res) {
  var date = req.body.date;
  var washout_all = [], washreturn_all = [];
  new Promise((resolve, reject) => {
    WashOut.getByDate(date, function(err, result) {
      if(err) {
        out_all = [];
      } else {
        var tmp = [];
        for(var i = 0; i < result.length; i++) {
          if(result[i].washdate == date) {
            var sum = 0;
            result[i].total = 0;
            for(var k = 0; k < result.length; k++) {
              if((result[k].order_name == result[i].order_name) && (result[k].style == result[i].style) && (result[k].color == result[i].color)) {
                result[i].total += Number(result[k].pcs);
              }
            }
            tmp.push(result[i]);
          }
        }
        out_all = tmp;
      }
      resolve();
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      WashReturn.getByDate(date, function(err, result) {
        if(err) {
          return_all = [];
        } else {
          var tmp = [];
          for(var i = 0; i < result.length; i++) {
            if(result[i].washdate == date) {
              var sum = 0;
              result[i].total = 0;
              for(var k = 0; k < result.length; k++) {
                if((result[k].order_name == result[i].order_name) && (result[k].style == result[i].style) && (result[k].color == result[i].color)) {
                  result[i].total += Number(result[k].pcs);
                }
              }
              tmp.push(result[i]);
            }
          }
          return_all = tmp;
        }
        resolve();
      })
    })    
  }).then(() => {
    res.json({isSuccess: true, washout: out_all, washreturn: return_all});
  })
}

exports.customer_inspection_data = function(req, res) {
  Inspection.getByDate(req.body.date, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: result});
    }
  })
}

exports.customer_production_data = function(req, res) {
  SewHourly.getByDate({date: req.body.date}, function(err, result) {
    if(err) {
      res.json({isSuccess: false});
    } else {
      var tmp = [];
      var sum1 = 0;
      
      for(var i = 0; i < result.length; i++) {
        var b = true;
        for(var j = 0; j < tmp.length; j++) {
          if(tmp[j].line == result[i].line) {
            b = false;
            for(var k = 1; k <13; k++) {
              tmp[j]['n'+k] = Number(tmp[j]['n'+k]?tmp[j]['n'+k]:0)+Number(result[i]['n'+k]?result[i]['n'+k]:0);
            }
            break;
          }
        }
        if(b) {
          tmp.push(result[i]);
        }
      }      
      res.json({isSuccess: true, list: tmp});
    }
  })
}

exports.customer_metadata_data = function(req, res) {
  var year = req.body.year;
  var month = req.body.month;
  var day = req.body.day;
  if(month.length < 2) month = '0' + month;
  if(day.length < 2) day = '0' + day;
  //day = '04';
  var date = year + '-' + month + '-' + day;
  SewHourly.getByDate({date: date}, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      const getDay = (dt) => {
        return Number(dt.slice(-2));
      }
      const getSum = (d) => {
        var sum = 0;
        for(var i = 1; i < 13; i++){
          sum += Number(d['n'+i]);          
        }
        return sum;
      }
      var data = {}, dailymeta = 0, dailypro = 0;
      for(var i = 0; i < result.length; i++){
        //Get Data By Line
        if(data[result[i].line] != undefined && data[result[i].line][getDay(result[i].date)] != undefined){
          data[result[i].line]['sum'] += getSum(result[i]);
          data[result[i].line]['meta'] += Number(result[i].qty);
          data[result[i].line]['prod'] += Number(result[i].qty)*Number(result[i].price);
        } else if(data[result[i].line] != undefined && data[result[i].line][getDay(result[i].date)] == undefined){
          data[result[i].line]['sum'] += getSum(result[i]);
          data[result[i].line]['meta'] += Number(result[i].qty);
          data[result[i].line]['prod'] += Number(result[i].qty)*Number(result[i].price);
        } else{
          if(!data[result[i].line]) {
            data[result[i].line] = {};
            data[result[i].line]['sum'] = getSum(result[i]);
            data[result[i].line]['meta'] = Number(result[i].qty);
            data[result[i].line]['prod'] = Number(result[i].qty)*Number(result[i].price);
          }
        }
      }

      res.json({isSuccess: true, data: JSON.stringify(data)});
    }
  })
}