var Const = require('../../config/const');
var Customer = require('../../models/customer');
var Others = require('../../models/other');

var Order = require('../../models/order');
var OrderDetail = require('../../models/orderdetail');

var SizeGroup = require('../../models/sizegroup');

var EmbroideryOut = require('../../models/embroideryout');
var EmbroideryReturn = require('../../models/embroideryreturn');

var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var uniqid = require('uniqid');
var EmbroideryOutExcel = require('../../scripts/embroideryoutexcel');
var EmbroideryReturnExcel = require('../../scripts/embroideryreturnexcel');

exports.embroideryout = function(req, res){
  var customers, colors, allcustomers, buyer, customer;

  new Promise((resolve, reject) =>{
      //Customer Type 6
    Others.getOthers({type: Const.codes[6].name}, function(err, type){
      if(err){
        res.redirect('/');
      }else{
        buyer = type.filter(v => {
          // Const.customertype[2].name = Buyer
          return v.name == Const.customertype[1].name;
        });
        customer = type.filter(v => {
          // Const.customertype[2].name = Embroiderying
          return v.name == Const.customertype[7].name;
        });
        resolve();
      }
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      Customer.list(function(err, list){
        if(err){
          res.redirect('/');
        }else{
          if(customer.length > 0) {
            allcustomers = list.filter(v => {
              return v.type == customer[0].id;
            });
          } else {
            allcustomers = list;
          }
          
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
          resolve();
        }
      })
    })
  }).then(()=>{
    res.render('dashboard/embroidery/embroideryout', {customers: customers, colors: colors, allcustomers: allcustomers, role: res.role});    
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

exports.add_embroideryout = function(req, res){
  EmbroideryOut.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.update_embroideryout = function(req, res){
  EmbroideryOut.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.delete_embroideryout = function(req, res) {
  EmbroideryOut.remove(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.list_embroideryout = function(req, res){
  var embroiderylist, orderlist;
  var p1 = new Promise((resolve, reject) => {
    EmbroideryOut.list(req.body, function(err, result){
      if(err){
        embroiderylist = [];
        reject();
      }else{
        embroiderylist = result;
        resolve();
      }
    });    
  })
  var p2 = new Promise((resolve, reject) => {
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
  Promise.all(promises)
  .catch(err=>{
  })
  .then(() => {
    var order = [];
    for(var j = 1; j < 11; j++){
      order[j] = 0;
    }

    for(var i = 0; i < orderlist.length; i++){
      for(var j = 1; j < 11; j++){
        order[j] += Number(orderlist[i]['s'+j]);
      }
    }

    res.json({isSuccess: true, list: embroiderylist, order: order});
  });
}

exports.upload_embroideryout = function(req,res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var filename;
    if(files.excel != undefined){
      filename = uniqid();
      var old_path = files.excel.path;
      var file_size = files.excel.size;
      var file_ext = files.excel.name.split('.').pop();    
      var new_path = path.join(appRoot, '/public/uploads/order/excel/', filename + '.' + file_ext);
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              console.log('uploading failure!');
              res.json({isSuccess: false});
            } else {
              console.log('uploading success!');
              EmbroideryOutExcel(new_path, fields.orderid, function(err, result){
                if(err){
                  res.json({isSuccess: false});
                }else{
                  res.json({isSuccess: true, fail: result});
                }
              });
            }
          });
        });
      });
    }
  });
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

exports.embroideryreturn = function(req, res){
  var customers, colors, allcustomers, buyer, customer;

  new Promise((resolve, reject) =>{
      //Customer Type 6
    Others.getOthers({type: Const.codes[6].name}, function(err, type){
      if(err){
        res.redirect('/');
      }else{
        buyer = type.filter(v => {
          // Const.customertype[2].name = Buyer
          return v.name == Const.customertype[1].name;
        });
        customer = type.filter(v => {
          // Const.customertype[2].name = Embroiderying
          return v.name == Const.customertype[7].name;
        });
        resolve();
      }
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      Customer.list(function(err, list){
        if(err){
          res.redirect('/');
        }else{
          if(customer.length > 0) {
            allcustomers = list.filter(v => {
              return v.type == customer[0].id;
            });
          } else {
            allcustomers = list;
          }
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
    res.render('dashboard/embroidery/embroideryreturn', {customers: customers, colors: colors, allcustomers: allcustomers, role: res.role});    
  })
}

exports.add_embroideryreturn = function(req, res){
  EmbroideryReturn.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.update_embroideryreturn = function(req, res){
  EmbroideryReturn.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.delete_embroideryreturn = function(req, res) {
  EmbroideryReturn.remove(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.list_embroideryreturn = function(req, res){
  var embroiderylist, orderlist;
  var p1 = new Promise((resolve, reject) => {
    EmbroideryReturn.list(req.body, function(err, result){
      if(err){
        embroiderylist = [];
        reject();
      }else{
        embroiderylist = result;
        resolve();
      }
    });    
  })
  var p2 = new Promise((resolve, reject) => {
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
  Promise.all(promises)
  .catch(err=>{
  })
  .then(() => {
    var order = [];
    for(var j = 1; j < 11; j++){
      order[j] = 0;
    }

    for(var i = 0; i < orderlist.length; i++){
      for(var j = 1; j < 11; j++){
        order[j] += Number(orderlist[i]['s'+j]);
      }
    }

    res.json({isSuccess: true, list: embroiderylist, order: order});
  });
  
}

exports.upload_embroideryreturn = function(req,res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var filename;
    if(files.excel != undefined){
      filename = uniqid();
      var old_path = files.excel.path;
      var file_size = files.excel.size;
      var file_ext = files.excel.name.split('.').pop();    
      var new_path = path.join(appRoot, '/public/uploads/order/excel/', filename + '.' + file_ext);
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              console.log('uploading failure!');
              res.json({isSuccess: false});
            } else {
              console.log('uploading success!');
              EmbroideryReturnExcel(new_path, fields.orderid, function(err, result){
                if(err){
                  res.json({isSuccess: false});
                }else{
                  res.json({isSuccess: true, fail: result});
                }
              });
            }
          });
        });
      });
    }
  });
}
