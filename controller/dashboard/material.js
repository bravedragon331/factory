var Const = require('../../config/const');
var Customer = require('../../models/customer');
var Others = require('../../models/other');

var Order = require('../../models/order');
var OrderDetail = require('../../models/orderdetail');
var ProductMaterialGroup = require('../../models/productmaterialgroup');
var FinishMaterialGroup = require('../../models/finishmaterialgroup');
var SubMaterial = require('../../models/submaterial');
var SizeGroup = require('../../models/sizegroup');

exports.in = function(req, res){
  var customers, materialtype = Const.materialtype, colors, allcustomers;

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
      Others.getOthers({type: Const.codes[5].name}, function(err, list){
        if(err){
          res.redirect('/');
        }else{
          colors = list;
          resolve();
        }
      })
    })    
  }).then(()=>{
    res.render('dashboard/material/in', {customers: customers, materialtype: materialtype, colors: colors, allcustomers: allcustomers});    
  })
}

exports.out = function(req, res){
  res.render('dashboard/material/out');
}

exports.order_search = function(req, res){
  let buyerid = req.body.buyer;
  let startdate = req.body.startdate;
  let enddate = req.body.enddate;
  let material_type = req.body.material_type;
  let material = req.body.material;
  let color = req.body.color;
  let po = req.body.po;
  let style = req.body.style;
  console.log(req.body);

  const filterByID = (result, id)=>{
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
    if(style){
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
    if(po){
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
          console.log(tmp);        
          resolve(tmp);
        })
      })
    }else{
      return new Promise((resolve, reject)=>{
        resolve(result);
      })
    }
  }
  const filterByMaterial = (result, type, material)=>{
    if(type == 'Product Material' && material != '-1'){
      return new Promise((resolve, reject)=>{
        var promises = [], tmp = [];
        var mypromise = (order)=>{
          return new Promise((resolve1, reject1)=>{
            ProductMaterialGroup.getByID(order.productgroup, function(err, res){
              if(err)
                reject1(err);
              else{
                if(res.length > 0){
                  for(var i = 1; i < 11; i++){
                    if(res[0]['productmaterial'+i.toString()] == material){
                      tmp.push(order);
                      break;
                    }
                  }
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
    }else if(type == 'Finish Material' && material != '-1'){
      return new Promise((resolve, reject)=>{
        var promises = [], tmp = [];
        var mypromise = (order)=>{
          return new Promise((resolve1, reject1)=>{
            FinishMaterialGroup.getByID(order.finishgroup, function(err, res){
              if(err)
                reject1(err);
              else{
                if(res.length > 0){
                  for(var i = 1; i < 11; i++){
                    if(res[0]['finishmaterial'+i.toString()] == material){
                      tmp.push(order);
                      break;
                    }
                  }
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
    else{
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
    return filterByID(result, req.body.buyer);
  }).then((result)=>{
    return filterByStyle(result, req.body.style);
  }).then((result)=>{
    return filterByColor(result, req.body.color);
  }).then((result)=>{
    return filterByPO(result, req.body.po);
  }).then((result)=>{
    return filterByMaterial(result, req.body.material_type, req.body.material);
  }).then((result) => {
    res.json({isSuccess: true, list: result});
  });
}

exports.order_material = function(req, res){
  var productmateriallist = [], finishmateriallist = [], material = [];
  Order.getOrder(req.body.name, req.body.buyer, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      let id = result[0].id;
      let productgroup = result[0].productgroup;
      let finishgroup = result[0].finishgroup;
      new Promise((resolve, reject)=>{
        ProductMaterialGroup.getByID(productgroup, function(err, res){
          if(err){
            reject(err);
          }else{
            for(var i = 1; i < 11; i++){
              if(res[0]['productmaterial' + i.toString()] != -1){
                productmateriallist.push(res[0]['productmaterial'+i.toString()]);
              }
            }
            resolve(res);
          }
        })
      }).then(result=>{        
        return new Promise((resolve, reject)=>{
          FinishMaterialGroup.getByID(finishgroup, function(err, res){
            if(err){
              reject(err);                
            }else{
              for(var i = 1; i < 11; i++){
                if(res[0]['finishmaterial' + i.toString()] != -1){
                  finishmateriallist.push(res[0]['finishmaterial'+i.toString()]);
                }
              }
              resolve(res);
            }
          })
        })
      }).then(result=>{
        return new Promise((resolve, reject) => {
          SubMaterial.getSubMaterials(function(err, result){
            if(err){
              reject(err)
            }else{
              material = result;
              resolve(material);
            }
          })
        });
      }).then(result=>{
        res.json({isSuccess: true, product: productmateriallist, finish: finishmateriallist, material: material})
      })
    }
  })
}

exports.material_task = function(req, res){
  var style = req.body.style;
  OrderDetail.allDetail({style: style}, function(err, list){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: list});
    }
  })
}

exports.size_list = function(req, res){
  var sizegroup = req.body.sizegroup;
  console.log(sizegroup);
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
                ret.push({id: i, name: list[j].name});
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