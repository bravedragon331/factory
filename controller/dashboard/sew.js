var Const = require('../../config/const');
var Customer = require('../../models/customer');
var Others = require('../../models/other');
var Line = require('../../models/line');
var Order = require('../../models/order');
var OrderDetail = require('../../models/orderdetail');
var SizeGroup = require('../../models/sizegroup');
var SewDaily = require('../../models/sewdaily');
var SewHourly = require('../../models/sewhourly');

exports.daily = function(req, res){
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
    res.render('dashboard/sew/daily', {customers: customers, colors: colors, allcustomers: allcustomers, lines: lines, orders: orders, role: res.role});    
  })
}

exports.order_detail = function(req, res){
  var orderid = req.body.orderid;
  OrderDetail.getByOrderID(orderid, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, data: result});
    }
  })
}


exports.size_list = function(req, res){
  var sizegroup = req.body.sizegroup;
  new Promise((resolve, reject)=>{
    SizeGroup.getByID({id: sizegroup}, function(err, list){
      if(err){
        res.json({isSuccess: false});
      }else{
        resolve(list[0]);
      }
    })
  }).then((group)=>{
    console.log(group);
    return new Promise((resolve, reject)=>{
      Others.getOthers({type: 'Size'}, function(err, list){
        if(err){
          res.json({isSuccess: false});
        }else{
          var ret = [];
          for(var i = 1; i < 11; i++){
            for(var j = 0; j < list.length; j++){
              if(group['size'+i] == list[j].id){
                console.log(j);
                ret.push({id: list[j].id, name: list[j].name});
              }
            }
          }
          resolve(ret);          
        }
      })
    })
  }).then((ret)=>{
    res.json({isSuccess: true, list: ret});
  })
}

exports.daily_add = function(req, res){
  SewDaily.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.daily_list = function(req, res){
  const filterByBuyer = (list)=>{
    for(var i = 0; i < list.length; i++){      
    }
  }
  const filterByLine = (list)=>{
    return new Promise((resolve, reject) => {
      if(req.body.line == -1){
        resolve(list);
      }else {
        var list1 =  list.filter(v =>{
          return (v.line == req.body.line)
        });
        resolve(list1);
      }
    }) 
  }
  const filterByInvoice = (list) => {
    return new Promise((resolve, reject) => {
      if(req.body.invoice == ''){
        resolve(list);
      }else {
        var list1 =  list.filter(v => {
          return (v.invoice == req.body.invoice);
        })
        resolve(list1);
      }
    })    
  }
  const filterByPO = (list) => {
    return new Promise((resolve, reject) => {
      if(req.body.po == ''){
        resolve(list);
      }else{
        resolve(list.filter(v => {
          return (v.po == req.body.po);
        }))
      }
    })
  }
  const filterByColor = (list) => {
    return new Promise((resolve, reject)=>{
      if(req.body.color == -1){
        resolve(list);
      }else{
        resolve(list.filter(v => {
          return (v.color == req.body.color);
        }))
      }
    })
  }

  new Promise((resolve, reject)=>{
    SewDaily.get(function(err, result){
      if(err){
        resolve([]);
      }else{
        console.log(result);
        resolve(result);        
      }
    })
  }).then(list => {
    return filterByInvoice(list);    
  }).then(list =>{
    return filterByLine(list);
  }).then(list => {
    return filterByPO(list);
  }).then(list => {
    return filterByColor(list)
  }).then(list => {
    res.json({isSuccess: true, list: list});
  })
}

exports.daily_update = function(req, res){
  SewDaily.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.hourly = function(req, res){
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
    res.render('dashboard/sew/hourly', {customers: customers, colors: colors, allcustomers: allcustomers, lines: lines, orders: orders, role: res.role});    
  })
}

exports.hourly_add = function(req, res){
  SewHourly.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.hourly_list = function(req, res){
  SewHourly.get(function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: result});
    }
  })
}

exports.hourly_update = function(req, res){
  SewHourly.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}