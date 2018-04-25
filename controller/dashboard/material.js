var Const = require('../../config/const');
var Customer = require('../../models/customer');
var Others = require('../../models/other');

var Order = require('../../models/order');
var OrderDetail = require('../../models/orderdetail');
var ProductMaterialGroup = require('../../models/productmaterialgroup');
var FinishMaterialGroup = require('../../models/finishmaterialgroup');
var SubMaterial = require('../../models/submaterial');
var SizeGroup = require('../../models/sizegroup');

var Department = require('../../models/department');

var MaterialIn = require('../../models/materialin');
var MaterialOut = require('../../models/materialout');

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
          console.log(err);
          reject(err);
        })
        .then(data => {
          console.log('all');
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
    console.log('step5');
    return filterByMaterial(result, req.body.material_type, req.body.material);
  }).then((result) => {
    console.log('finish');
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

exports.material_in = function(req, res){
  MaterialIn.addMaterial(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.material_in_update = function(req, res){
  MaterialIn.updateMaterial(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.material_in_list = function(req, res){
  MaterialIn.loadList(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: result});
    }
  })
}

exports.material_in_delete = function(req, res){
  MaterialIn.delete1(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.out = function(req, res){
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
    res.render('dashboard/material/out', {customers: customers, materialtype: materialtype, colors: colors, allcustomers: allcustomers});    
  })
}

exports.material_out = function(req, res){
  MaterialOut.addMaterial(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.material_out_update = function(req, res){
  MaterialOut.updateMaterial(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.material_out_list = function(req, res){
  MaterialOut.loadList(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: result});
    }
  })
}

exports.material_out_delete = function(req, res){
  MaterialOut.delete1(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.stock = function(req, res){  
  var customers, materialtype = Const.materialtype, colors, allcustomers, size, submaterial;

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
    return new Promise((resolve, reject)=>{
      Others.getOthers({type: 'Size'}, function(err, result){
        if(err){
          res.redirect('/');
        }else{
          size = result;
          resolve();
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      SubMaterial.getSubMaterials(function(err, result){
        if(err){
          res.redirect('/');
        }else{
          submaterial = result;
          resolve();
        }
      })
    })
  }).then(()=>{
    res.render('dashboard/material/stock', {customers: customers, materialtype: materialtype, colors: colors, allcustomers: allcustomers, size: size, submaterial: submaterial});
  })
}

exports.stock_search = function(req, res){
  const filterByPO = (list, po)=>{
    if(po){
      return new Promise((resolve, reject)=>{
        console.log(list.length);
        var list1 = list.filter(v =>{
          return v.po == po;
        })
        resolve(list1);
      })
    }else{
      return new Promise((resolve, reject)=>{
        resolve(list);
      })
    }
  }
  const filterByStyle = (list, style)=>{
    if(style){
      return new Promise((resolve, reject)=>{
        var list1 = list.filter(v =>{ return v.style == style;})
        resolve(list1);
      })
    }else{
      return new Promise((resolve, reject)=>{ resolve(list); })
    }
  }
  const filterByColor = (list, color) => {
    if(color != -1){
      return new Promise((resolve, reject)=>{
        var list1 = list.filter(v => { return v.color == color;})
        resolve(list1);
      })
    }else{
      return new Promise((resolve, reject)=>{ resolve(list); })
    }
  }
  const filterByBuyer = (list, buyer) => {
    if(buyer!= -1){
      return new Promise((resolve, reject) => {
        var list1 = list.filter(v => { return v.buyer == buyer;});
        resolve(list1);
      })
    }else{
      return new Promise((resolve, reject)=>{ resolve(list); })
    }
  }
  const filterByMaterialType = (list, type)=>{
    if(type == 'Product Material')
      type = 1;
    else if(type == 'Finish Material')
      type = 0;
    if(type != -1){
      return new Promise((resolve, reject) => {
        var list1 = list.filter(v => { return v.materialtype == type; });
        resolve(list1);
      })
    }else{
      return new Promise((resolve, reject) => { resolve(list); })
    }
  }
  const filterByMaterial = (list, material) => {
    if(material != -1){
      return new Promise((resolve, reject) => {
        var list1 = list.filter(v => { return v.material == material; })
        resolve(list1);
      })
    }else{
      return new Promise((resolve, reject) => { resolve(list); })
    }
  }

  var indata, outdata;

  console.log(req.body);

  new Promise((resolve, reject)=>{
    MaterialIn.getAll(function(err, list){
      if(err){
        res.json({isSuccess: false});
      }else{
        resolve(list);
      }
    })
  }).then((list)=>{
    return filterByPO(list, req.body.po);
  }).then(list=>{
    return filterByStyle(list, req.body.style);
  }).then(list=>{
    return filterByColor(list, req.body.color);
  }).then(list=>{
    return filterByBuyer(list, req.body.buyer);
  }).then(list=>{
    return filterByMaterialType(list, req.body.material_type);
  }).then(list => {
    return filterByMaterial(list, req.body.material);
  }).then(list=>{
    var b = [], ret = [];
    for(var i = 0; i < list.length; i++){
      if(b[i] == 1) continue;
      var sum = 0;
      for(var j = 0; j < list.length; j++){
        if(list[i].size == list[j].size && list[i].po == list[j].po && list[i].material == list[j].material && list[i].materialtype == list[j].materialtype){
          b[j] = 1;
          sum += list[j].quantity;
        }
      }
      ret.push({style: list[i].style, po: list[i].po, material: list[i].material, materialtype: list[i].materialtype, size: list[i].size, sum: sum});
    }
    /*
    { style: '123',
    po: 'po-1231',
    material: 8,
    materialtype: 1,
    size: 'XL',
    sum: 1 }
    */
    indata = ret;
    return new Promise((resolve, reject)=>{
      resolve();
    })    
  }).then(list =>{
    return new Promise((resolve, reject)=>{
      MaterialOut.getAll(function(err, list){
        if(err){
          res.json({isSuccess: false});
        }else{
          resolve(list);
        }
      })
    })
  }).then((list)=>{
    return filterByPO(list, req.body.po);
  }).then(list=>{
    return filterByStyle(list, req.body.style);
  }).then(list=>{
    return filterByColor(list, req.body.color);
  }).then(list=>{
    return filterByBuyer(list, req.body.buyer);
  }).then(list=>{
    return filterByMaterialType(list, req.body.material_type);
  }).then(list => {
    return filterByMaterial(list, req.body.material);
  }).then(list=>{
    var b = [], ret = [];
    for(var i = 0; i < list.length; i++){
      if(b[i] == 1) continue;
      var sum = 0;
      for(var j = 0; j < list.length; j++){
        if(list[i].size == list[j].size && list[i].po == list[j].po && list[i].material == list[j].material && list[i].materialtype == list[j].materialtype){
          b[j] = 1;
          sum += list[j].quantity;
        }
      }
      ret.push({style: list[i].style, po: list[i].po, material: list[i].material, materialtype: list[i].materialtype, size: list[i].size, sum: sum});
    }
    outdata  = ret;
    return new Promise((resolve, reject)=>{
      resolve();
    })
  }).then(()=>{
    var ret = [], b = [], i , j;

    for(i = 0; i < indata.length; i++){
      for(j = 0; j < ret.length; j++){
        if(indata[i].style == ret[j].style && indata[i].po == ret[j].po && indata[i].material == ret[j].material && indata[i].materialtype == ret[j].materialtype)
          break;
      }
      
      if(j == ret.length){
        ret.push({style: indata[i].style, po: indata[i].po, material: indata[i].material, materialtype: indata[i].materialtype});
      }

      if(ret[j][indata[i].size] != undefined){
        ret[j][indata[i].size] += indata[i].sum;
      }else{
        ret[j][indata[i].size] = indata[i].sum;
      }
    }

    for(i = 0; i < outdata.length; i++){
      for(j = 0; j < ret.length; j++){
        if(outdata[i].style == ret[j].style && outdata[i].po == ret[j].po && outdata[i].material == ret[j].material && outdata[i].materialtype == ret[j].materialtype)
          break;
      }
      
      if(j == ret.length){
        ret.push({style: outdata[i].style, po: outdata[i].po, material: outdata[i].material, materialtype: outdata[i].materialtype});
      }

      if(ret[j][outdata[i].size] != undefined){
        ret[j][outdata[i].size] -= outdata[i].sum;
      }else{
        ret[j][outdata[i].size] = -outdata[i].sum;
      }
    }
    console.log(ret);
    res.json({isSuccess: true, list: ret});    
  });
}