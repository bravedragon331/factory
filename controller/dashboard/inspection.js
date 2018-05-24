var Const = require('../../config/const');
var Customer = require('../../models/customer');
var Others = require('../../models/other');
var Line = require('../../models/line');
var Order = require('../../models/order');
var OrderDetail = require('../../models/orderdetail');
var SizeGroup = require('../../models/sizegroup');
var Inspection = require('../../models/inspection');

exports.index = function(req, res){
  var customers, colors, allcustomers, lines, orders;

  new Promise((resolve, reject) =>{
      //Customer Type 6
    Others.getOthers({type: Const.codes[6].name}, function(err, type){
      if(err){
        res.redirect('/');
      }else{
        resolve(type.filter(v => {
          // Const.customertype[2].name = Buyer
          return v.name == Const.customertype[1].name;
        }))
      }
    })
  }).then((buyer) => {
    return new Promise((resolve, reject) => {
      Customer.list(function(err, list){
        if(err){
          res.redirect('/');
        }else{
          allcustomers = list;
          customers = list.filter(v => {
            return v.type == buyer[0].id;
          })
          console.log(customers);
          resolve();
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject) => {
        // Color 5
      Others.getAll(function(err, list){
        if(err){
          res.redirect('/');
        }else{
          colors = list.filter(v=>{
            return v.type1 == Const.codes[5].name;
          });          
          resolve();
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      Line.allLine(function(err, result){
        if(err){
          res.redirect('/');
        }else{
          lines = result;
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
          resolve();
        }
      })
    })
  }).then(()=>{
    res.render('dashboard/inspection/inspection', {customers: customers, colors: colors, allcustomers: allcustomers, lines: lines, orders: orders, role: res.role});    
  })
}

exports.inspection_add = function(req, res){
  Inspection.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.inspection_list = function(req, res){
  Inspection.get(function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      if(req.body.color != '-1') {
        result = result.filter(v => {
          return v.color == req.body.color;
        })        
      }
      if(req.body.buyer != '-1') {
        result = result.filter(v => {
          return v.buyer == req.body.buyer;
        })
      }
      if(req.body.file != '-1') {
        result = result.filter(v => {
          return v.orderid == req.body.file;
        })
      }
      res.json({isSuccess: true, list: result});
    }
  })
}

exports.inspection_update = function(req, res){
  Inspection.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.inspection_remove = function(req ,res){
  Inspection.remove(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}