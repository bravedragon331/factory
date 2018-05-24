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

var FabricIn = require('../../models/fabricin');
var FabricOut = require('../../models/fabricout');

var Cut = require('../../models/cut');

exports.cut = function(req, res){
  var customers, colors, allcustomers, fabrictype, fabric;

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
          fabrictype = list.filter(v => {
            return v.type1 == Const.codes[9].name;
          })
          resolve();
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      Fabric.getFabrics(function(err, result){
        if(err){
          res.redirect('/');
        }else{
          fabric = result;
          resolve();
        }
      })
    })    
  }).then(()=>{
    res.render('dashboard/cut/cut', {customers: customers, fabrictype: fabrictype, fabric: fabric, colors: colors, allcustomers: allcustomers, role: res.role});    
  })
}

exports.order_detail = function(req, res){
  var order, orderdetails, sizegroup, sizes;
  new Promise((resolve, reject)=>{
    Order.getOrder(req.body.name, req.body.buyer, function(err, rows){
      if(err){
        res.json({isSuccess: false});
        reject(err);
      }else{
        order = rows[0];
        resolve();
      }
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      OrderDetail.getByOrderID(order.id, function(err, rows){
        if(err){
          res.json({isSuccess: false});
          reject(err);
        }else{
          orderdetails = rows;
          resolve();
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      SizeGroup.getByID({id: order.sizegroup}, function(err, rows){
        if(err){
          res.json({isSuccess: false});
          reject(err);
        }else{
          sizegroup = rows[0];
          resolve();
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject) => {
      Others.getOthers({type: 'Size'}, function(err, rows){
        if(err){
          res.json({isSuccess: false});
          reject(err);
        }else{
          sizes = rows;
          resolve();
        }
      })
    })
    
  }).then(()=>{
    res.json({isSuccess: true, order: order, orderdetails: orderdetails, sizes: sizes, sizegroup: sizegroup});
  })
}

exports.add = function(req, res){
  Cut.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.update = function(req, res){
  Cut.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.list = function(req, res){
  Cut.list(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: result});
    }
  });
}

exports.deleteCut = function(req, res){
  Cut.deleteCut(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: result});
    }
  })
}

exports.order_search = function(req, res){
  let buyerid = req.body.buyer;
  let startdate = req.body.startdate;
  let enddate = req.body.enddate;
  let fabric_type = req.body.fabric_type;
  let fabric = req.body.fabric;
  let color = req.body.color;
  let po = req.body.po;
  let style = req.body.style;

  var cutlist = [];
  const filterByBuyerID = (result, id)=>{
    if(id == '-1'){      
      return new Promise((resolve, reject)=>{
        resolve(result);
      })
    }else{
      return new Promise((resolve, reject)=>{
        result = result.filter(v =>{
          return v.buyer == buyerid;
        })
        resolve(result);
      })
    }
  }
  const filterByStyle = (result, style)=>{
    if(style != ""){
      return new Promise((resolve, reject)=>{
        result = result.filter(v =>{
          return v.style == style;
        })
      })
    }else{
      return new Promise((resolve, reject)=>{
        resolve(result);
      })
    }
  }
  const filterByColor = (result, color)=>{    
    if(color == -1){
      return new Promise((resolve, reject)=>{
        resolve(result);
      })
    }else{
      return new Promise((resolve, reject)=>{
        var promises = [], tmp = [];
        var mypromise = (order)=>{
          return new Promise((resolve1, reject1)=>{
            OrderDetail.getByOrderIDCOLOR(order.id, color, function(err, res){              
              if(err)
                reject1(err);
              else{
                if(res.length > 0){
                  tmp.push(order);
                  resolve1();
                }
                else
                  resolve1();
              }
            })
          })
        }
        result.forEach(myorder => {
          promises.push(mypromise(myorder));
        });
        
        Promise.all(promises)
        .catch(err=>{
          reject(err);
        })
        .then(data => {
          resolve(tmp);
        })
      })      
    }
  }
  const filterByPO = (result, po)=>{
    if(po != ''){
      return new Promise((resolve, reject)=>{
        var promises = [], tmp = [];
        var mypromise = (order)=>{
          return new Promise((resolve1, reject1)=>{
            OrderDetail.getByOrderIDPO(order.id, po, function(err, res){              
              if(err)
                reject1(err);
              else{
                if(res.length > 0){
                  tmp.push(order);
                  resolve1();
                }
                else
                  resolve1();
              }
            })
          })
        }
        result.forEach(myorder => {
          promises.push(mypromise(myorder));
        });
        
        Promise.all(promises)
        .catch(err=>{
          reject(err);
        })
        .then(data => {
          resolve(tmp);
        })
      })
    }else{
      return new Promise((resolve, reject)=>{
        resolve(result);
      })
    }
  }
  const filterByFabric = (result, type, fabric)=>{
    return new Promise((resolve, reject)=>{
      OrderFabric.getAll(function(err, rows){
        if(type != '-1') rows = rows.filter(v=> { return v.fabrictypecode == type; });
        if(fabric != '-1') rows = rows.filter(v => { return v.fabriccode == fabric; });
        var ret = [];
        for(var i = 0; i < result.length; i++){
          for(var j = 0; j < rows.length; j++){
            if(rows[j].orderid == result[i].id && !ret.includes(result[i])){
              ret.push(result[i]);
            }
          }
        }
        resolve(ret);
      })
    })    
  }
  const filterByDate = (result, date1, date2) => {
    return new Promise((resolve, reject) => {
      var startdate = date1.replace(new RegExp('/', 'g'), '-').replace(/\s/g, '');
      var enddate = date2.replace(new RegExp('/', 'g'), '-').replace(/\s/g, '');
      cutlist = cutlist.filter(v => {              
        return (new Date(v.cutdate) >= new Date(startdate.toString()) && new Date(v.cutdate) <= new Date(enddate.toString()))
      })
      result = result.filter(v => {
        for(var i = 0; i < cutlist.length; i++) {
          if(cutlist[i].orderid == v.id) {
            return true;
          }
        }
        return false;
      })
      resolve(result);
    })
  }

  new Promise((resolve, reject)=>{
    Order.getAll(function(err, res){      
      if(err){
        res.json({isSuccess: false});
      }else{
        resolve(res);
      }
    })
  }).then((result) => {
    return new Promise((resolve, reject) => {
      Cut.all(function(err, res) {
        if(err) {
          res.json({isSuccess: false});
        }else {
          cutlist = res;
          resolve(result);
        }
      })
    })    
  }).then((result)=>{    
    return filterByBuyerID(result, req.body.buyer);
  }).then((result)=>{    
    return filterByStyle(result, req.body.style);
  }).then((result)=>{
    return filterByColor(result, req.body.color);
  }).then((result)=>{
    return filterByPO(result, req.body.po);
  }).then((result)=>{
    return filterByFabric(result, req.body.fabric_type, req.body.fabric);
  }).then((result) => {
    return filterByDate(result, req.body.startdate, req.body.enddate);
  }).then((result) => {
    console.log('finish');
    res.json({isSuccess: true, list: result});
  });
}