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

exports.in = function(req, res){
  var customers, colors, allcustomers, fabrictype, fabric;

  new Promise((resolve, reject) =>{
      //Customer Type 6
    Others.getOthers({type: Const.codes[6].name}, function(err, type){
      if(err){
        res.redirect('/');
      }else{
        resolve({
          buyer: type.filter(v => { return v.name == Const.customertype[1].name;}),
          fabric: type.filter(v => { return v.name == Const.customertype[4].name;}),
        })
      }
    })
  }).then((obj) => {
    let buyer = obj.buyer;
    let fab = obj.fabric;
    return new Promise((resolve, reject) => {
      Customer.list(function(err, list){
        if(err){
          res.redirect('/');
        }else{
          allcustomers = list.filter(v => {
            return v.type == fab[0].id;
          })

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
    res.render('dashboard/fabric/in', {customers: customers, fabrictype: fabrictype, fabric: fabric, colors: colors, allcustomers: allcustomers, role: res.role});    
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
  }).then((result)=>{    
    return filterByFabric(result, req.body.fabric_type, req.body.fabric);
  }).then((result) => {    
    console.log('finish');
    res.json({isSuccess: true, list: result});
  });
}

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

exports.order_detail = function(req, res){
  OrderDetail.allDetailByOrderName({ordername: req.body.ordername}, function(err, list){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: list});
    }
  })
}

exports.fabric_in = function(req, res){
  console.log(req.body);
  FabricIn.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.fabric_in_update = function(req, res){
  FabricIn.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.fabric_in_list = function(req, res){
  console.log(req.body);
  FabricIn.get(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{      
      res.json({isSuccess: true, list: result});
    }
  })
}

exports.out = function(req, res){
  var customers, colors, allcustomers, fabrictype, fabric;

  new Promise((resolve, reject) =>{
      //Customer Type 6
    Others.getOthers({type: Const.codes[6].name}, function(err, type){
      if(err){
        res.redirect('/');
      }else{
        resolve({
          buyer: type.filter(v => { return v.name == Const.customertype[1].name;}),
          fabric: type.filter(v => { return v.name == Const.customertype[4].name;}),
        })        
      }
    })
  }).then((obj) => {
    let buyer = obj.buyer;
    let fab = obj.fabric;

    return new Promise((resolve, reject) => {
      Customer.list(function(err, list){
        if(err){
          res.redirect('/');
        }else{
          // allcustomers = list.filter(v => {
          //   return v.type == fab[0].id;
          // })
          customers = list.filter(v => {
            return v.type == buyer[0].id;
          })
          console.log(customers);
          resolve();
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      Department.getDepartment(function(err, list){
        if(err){
          res.redirect('/');
        }else{
          allcustomers = list;
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
    res.render('dashboard/fabric/out', {customers: customers, fabrictype: fabrictype, fabric: fabric, colors: colors, allcustomers: allcustomers, role: res.role});    
  })
}

exports.fabric_out = function(req, res){
  console.log(req.body);
  FabricOut.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.fabric_out_update = function(req, res){
  FabricOut.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.fabric_out_list = function(req, res){
  console.log(req.body);
  FabricOut.get(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{      
      res.json({isSuccess: true, list: result});
    }
  })
}

exports.stock = function(req, res){
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
    res.render('dashboard/fabric/stock', {customers: customers, fabrictype: fabrictype, fabric: fabric, colors: colors, allcustomers: allcustomers, role: res.role});    
  })
}

exports.stock_search = function(req, res){
  var inlist, outlist;
  const filterByPO = (list, po)=>{
    if(po != ''){
      return new Promise((resolve, reject)=>{
        var list1 = list.inlist.filter(v =>{ return v.po == po; });
        var list2 = list.outlist.filter(v => {return v.po == po; });
        resolve({inlist: list1, outlist: list2});
      })
    }else{      
      return new Promise((resolve, reject)=>{
        resolve(list);
      })
    }
  }
  const filterByFabric = (list, fabric)=>{
    if(fabric != -1){
      return new Promise((resolve, reject)=>{
        var list1 = list.inlist.filter(v =>{ return v.fabric == fabric; });
        var list2 = list.outlist.filter(v => {return v.fabric == fabric; });
        resolve({inlist: list1, outlist: list2});
      })
    }else{
      return new Promise((resolve, reject)=>{
        resolve(list);
      })
    }
  }
  const filterByFabricType = (list, fabrictype)=>{
    if(fabrictype != -1){
      return new Promise((resolve, reject)=>{
        var list1 = list.inlist.filter(v =>{ return v.fabrictype == fabrictype; });
        var list2 = list.outlist.filter(v => {return v.fabrictype == fabrictype; });
        resolve({inlist: list1, outlist: list2});
      })
    }else{
      return new Promise((resolve, reject)=>{
        resolve(list);
      })
    }
  }
  const filterByColor = (list, color)=>{
    if(color != 'Not Selected'){
      return new Promise((resolve, reject)=>{
        var list1 = list.inlist.filter(v =>{ return v.color == color; });
        var list2 = list.outlist.filter(v => {return v.color == color; });
        resolve({inlist: list1, outlist: list2});
      })
    }else{
      return new Promise((resolve, reject)=>{
        resolve(list);
      })
    }
  }
  const filterByStyle = (list, style) => {
    if(style != ''){
      return new Promise((resolve, reject)=>{
        var list1 = list.inlist.filter(v =>{ return v.style == style; });
        var list2 = list.outlist.filter(v => {return v.style == style; });
        resolve({inlist: list1, outlist: list2});
      })
    }else{
      return new Promise((resolve, reject)=>{
        resolve(list);
      })
    }
  }

  new Promise((resolve, reject)=>{    
    FabricIn.getAll(function(err, rows){
      if(err){
        res.json({isSuccess: false});
        reject(err);
      }else{
        inlist = rows;
        resolve(rows);
      }
    })
  }).then(()=>{
    return new Promise((resolve, reject) => {
      FabricOut.getAll(function(err, rows){
        if(err){
          res.json({isSuccess: false});
          reject(err);
        }else{
          outlist = rows;
          resolve(rows);
        }
      })
    })
  }).then(()=>{
    return filterByPO({inlist: inlist, outlist: outlist}, req.body.po);
  }).then(list => {    
    return filterByFabric(list, req.body.fabric);
  }).then(list =>{
    return filterByFabricType(list, req.body.fabrictype);
  }).then(list=>{
    return filterByColor(list, req.body.color);
  }).then(list =>{
    return filterByStyle(list, req.body.style);
  }).then(list=>{
    var ret = [];
    for(var i = 0; i < list.inlist.length; i++){
      for(var j = 0; j < ret.length; j++){
        if(list.inlist[i].color == ret[j].color && list.inlist[i].fabric == ret[j].fabric && list.inlist[i].fabrictype == ret[j].fabrictype){
          ret[j].kg += list.inlist[i].kg;
          ret[j].inyds += list.inlist[i].yds;
          ret[j].inroll += list.inlist[i].roll;
          break;
        }
      }
      if(j == ret.length){
        ret.push({color: list.inlist[i].color, fabric: list.inlist[i].fabric, fabrictype: list.inlist[i].fabrictype,
          kg: list.inlist[i].kg, inyds: list.inlist[i].yds, inroll: list.inlist[i].roll, outyds: 0, outroll: 0, lote: list.inlist[i].lote, rack: list.inlist[i].rack});
      }
    }

    for(var i = 0; i < list.outlist.length; i++){
      for(var j = 0; j < ret.length; j++){
        if(list.outlist[i].color == ret[j].color && list.outlist[i].fabric == ret[j].fabric && list.outlist[i].fabrictype == ret[j].fabrictype){
          ret[j].kg -= list.outlist[i].kg;
          ret[j].outyds += list.outlist[i].yds;
          ret[j].outroll += list.outlist[i].roll;
          break;
        }
      }
      if(j == ret.length){
        ret.push({color: list.outlist[i].color, fabric: list.outlist[i].fabric, fabrictype: list.outlist[i].fabrictype,
          kg: -list.outlist[i].kg, outyds: list.outlist[i].yds, outroll: list.outlist[i].roll, inyds: 0, inroll: 0, lote: '', rack: ''});
      }
    }

    res.json({isSuccess: true, list: ret});
  })
}