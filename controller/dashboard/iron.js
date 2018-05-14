var Const = require('../../config/const');
var Customer = require('../../models/customer');
var Others = require('../../models/other');

var Order = require('../../models/order');
var OrderDetail = require('../../models/orderdetail');
var SizeGroup = require('../../models/sizegroup');
var Iron = require('../../models/iron');
var SewDaily = require('../../models/sewdaily');
var Cut = require('../../models/cut');

exports.index = function(req, res){
  var customers, colors, allcustomers;

  new Promise((resolve, reject) =>{
      //Customer Type 6
    Others.getOthers({type: Const.codes[6].name}, function(err, type){
      if(err){
        res.redirect('/');
      }else{
        resolve(type.filter(v => {
          // Const.customertype[1].name = Buyer
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
    res.render('dashboard/iron/iron', {customers: customers, colors: colors, allcustomers: allcustomers, role: res.role});    
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

exports.add_iron = function(req, res){
  Iron.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.update_iron = function(req, res){
  Iron.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.list_iron = function(req, res){
  var ironlist, cutlist, orderlist, sewlist;
  var p1 = new Promise((resolve, reject) => {
    Iron.list(req.body, function(err, result){
      if(err){
        ironlist = [];
        reject();
      }else{
        ironlist = result;
        resolve();
      }
    });
  });
  var p2 = new Promise((resolve, reject) => {
    SewDaily.list(req.body, function(err, result){
      if(err){
        sewlist = [];
        reject();
      }else{
        sewlist = result;
        resolve();
      }
    })
  });
  var p3 = new Promise((resolve, reject) => {
    Cut.list(req.body, function(err, result){
      if(err){
        cutlist = [];
        reject();
      }else{
        cutlist = result;
        resolve();
      }
    })
  });
  var p4 = new Promise((resolve, reject) => {
    OrderDetail.getByOrderID(req.body.orderid, function(err, result){
      if(err){
        orderlist = [];
        reject();
      }else{
        orderlist = result;
        resolve();
      }
    })
  });

  var promises = [];
  promises.push(p1);
  promises.push(p2);
  promises.push(p3);
  promises.push(p4);

  Promise.all(promises)
  .catch(err=>{
  })
  .then(() => {
    var order = [], cut = [], sew = [];
    for(var j = 1; j < 11; j++){
      order[j] = 0;
      cut[j] = 0;
    }

    for(var i = 0; i < orderlist.length; i++){
      for(var j = 1; j < 11; j++){
        order[j] += Number(orderlist[i]['s'+j]);
      }
    }
    for(var i = 0; i < cutlist.length; i++){
      for(var j = 1; j < 11; j++){
        cut[j] += Number(cutlist[i]['size'+j]);
      }
    }
    for(var i = 0; i < sewlist.length; i++){
      for(var j = 0; j < sew.length; j++){
        if(sew[j].id == sewlist[i].size){
          sew[j].amount += Number(sewlist[i].primeras);
          break;
        }
      }
      if(j == sew.length){
        sew.push({id: sewlist[i].size, amount: Number(sewlist[i].primeras)});
      }
    }
    res.json({isSuccess: true, iron: ironlist, cut: cut, order: order, sew: sew});
  })
}

exports.order_search = function(req, res){
  let buyerid = req.body.buyer;
  let startdate = req.body.startdate;
  let enddate = req.body.enddate;
  let color = req.body.color;
  let po = req.body.po;
  let style = req.body.style;
  console.log(req.body);

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
        resolve(result);
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
          console.log(tmp);        
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
  
  new Promise((resolve, reject)=>{
    Order.getAll(function(err, res){      
      if(err){
        res.json({isSuccess: false});
      }else{
        resolve(res);
      }
    })
  }).then((result)=>{    
    return filterByBuyerID(result, req.body.buyer);
  }).then((result)=>{    
    return filterByStyle(result, req.body.style);
  }).then((result)=>{
    return filterByColor(result, req.body.color);
  }).then((result)=>{
    return filterByPO(result, req.body.po);
  }).then((result) => {    
    console.log('finish');
    res.json({isSuccess: true, list: result});
  });
}
