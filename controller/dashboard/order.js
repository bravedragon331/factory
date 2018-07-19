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
var Report = require('../../models/report');
var Follower = require('../../models/follower');

var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var uniqid = require('uniqid');

var OneSignal = require('onesignal-node');
var smtpConfig = require('../../config/smtpConfig');
var nodemailer = require('nodemailer');

var parseExcel = require('../../scripts/excel');

exports.list = function(req, res){
  var users, buyercode, customers, colors, fabric;
  new Promise((resolve, reject) => {
    User.getUsers(function(err, result){
      if(err){
        res.redirect('/');
      }else{
        users = result.filter(v =>{
          //if(v.type == 1) return true;
          //else return false;
          return true;
        });
        resolve(users);
      }
    })
  }).then(()=>{
    return new Promise((resolve, reject) =>{
      Others.getBuyerCode(function(err, result){
        buyercode = result[0];
        resolve(buyercode);
      })      
    })    
  }).then(() =>{
    return new Promise((resolve, reject) => {
      Customer.list(function(err, result){
        if(err){
          res.redirect('/');
        }else{
          customers = result.filter(v =>{
            if(v.type == buyercode.id) return true;
            else return false;
          });
          resolve(customers);
        }
      })
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
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
    Order.getAll(function(err, result){
      res.render('dashboard/order/list', {users: users, customers: customers, list: result, role: res.role, fabric: fabric, colors: colors});
    })
  })
  
}
exports.order_search = function(req, res) {
  var orders, details;
  new Promise((resolve, reject) => {
    Order.getAll(function(err, result) {
      if(err) {
        res.json({isSuccess: false});
      } else {
        orders = result;
        resolve();
      }
    })
  }).then(() => {
    OrderDetail.getAll(function(err, result) {
      if(err) {
        res.json({isSuccess: false});
      } else {
        details = result;
        if(req.body.color != '-1') {
          orders = orders.filter( v => {
            for(var i = 0; i < details.length; i++) {
              if(details[i].orderid == v.id && details[i].color == req.body.color) {
                return true;
              }
            }
            return false;
          })
        }
        if(req.body.po != '') {
          orders = orders.filter( v => {
            for(var i = 0; i < details.length; i++) {
              if(details[i].orderid == v.id && details[i].po == req.body.po) {
                return true;
              }
            }
            return false;
          })
        }
        res.json({isSuccess: true, list: orders});
      }
    })
  })
}
exports.new = function(req, res){
  res.render('dashboard/order/new', {role: res.role});
}
exports.order_detail = function(req, res){
  let ordername = req.body.ordername;
  let buyer = req.body.buyer;
  var order, fabriccode, yarncode, fabrictypecode, colorcode, prioritycode, sizegroup, sizecode, productgroup, finishgroup;
  new Promise((resolve, reject) =>{
    Order.getOrder(ordername, buyer, function(err, result){
      if(err){
        res.render('/');
      }else{
        order = result;
        resolve(order);
      }
    })
  }).then(()=>{
    return new Promise((resolve, reject) =>{
      Others.getOthers({type: Const.codes[9].name}, function(err, result){
        if(err){
          res.render('/');
        }else{
          fabrictypecode = result;
          resolve(fabrictypecode);
        }
      })
    })
  })
  .then(()=>{
    return new Promise((resolve, reject)=>{
      Fabric.getFabrics(function(err, result){
        if(err){
          res.render('/');
        }else{
          fabriccode = result;
          resolve(fabriccode);
        }
      })
    })    
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      Yarn.getYarns(function(err, result){
        if(err){
          res.render('/');
        }else{
          yarncode = result;
          resolve(yarncode);
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject) =>{
      Others.getOthers({type: Const.codes[5].name}, function(err, result){
        if(err){
          res.render('/');
        }else{
          colorcode = result;
          resolve(colorcode);
        }
      })
    })    
  }).then(()=>{
    return new Promise((resolve, reject) =>{
      Others.getOthers({type: Const.codes[10].name}, function(err, result){
        if(err){
          res.render('/');
        }else{
          prioritycode = result;
          resolve(prioritycode);
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      SizeGroup.get({customer: order[0].buyer}, function(err, result){
        if(err){
          res.render('/');
        }else{
          console.log(result);
          console.log(order[0].sizegroup);          
          let f_result = result.filter(v =>{
            return v.id == order[0].sizegroup;
          });
          sizegroup = f_result[0];
          console.log(sizegroup);
          resolve(sizegroup);
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      Others.getOthers({type: Const.codes[7].name}, function(err, result){
        if(err){
          res.render('/');
        }else{
          sizecode = result;
          resolve(sizecode);
        }
      })
    })
  }).then(()=>{
    console.log(buyer);
    return new Promise((resolve, reject)=>{
      ProductMaterialGroup.get({customer: order[0].buyer}, function(err, result){
        
        for(var i = 0; i < result.length; i++){
          if(result[i].id == order[0].productgroup)
            productgroup = result[i];
        }
        if(order[0].productgroup == -1){
          productgroup = {name: order[0].productgroupname};
        }
        resolve();
      })
    })    
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      FinishMaterialGroup.get({customer: order[0].buyer}, function(err, result){
        for(var i = 0; i < result.length; i++){
          if(result[i].id == order[0].finishgroup)
            finishgroup = result[i];
        }
        if(order[0].finishgroup == -1){
          finishgroup = {name: order[0].finishgroupname};
        }
        resolve();
      })
    })
  }).then(()=>{
    res.render('dashboard/order/detail', {
      order: order[0], fabriccode: fabriccode, yarncode: yarncode, fabrictypecode: fabrictypecode, colorcode: colorcode, 
      prioritycode: prioritycode, sizegroup: sizegroup, sizecode:sizecode, productgroup: productgroup, finishgroup: finishgroup,
      work: Const.OrderDetailWork, role: res.role
    });
  })
}
exports.order_detail_byid = function(req, res){
  Order.getOrderById(req.body.id, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      let order = result[0];
      res.json({isSuccess: true, order: order});
    }
  })
}
exports.image_delete = function(req, res){
  new Promise((resolve, reject)=>{
    Order.getOrderById(req.body.id, function(err, result){
      if(err){
        reject(err);
        res.json({isSuccess: false});
      }else{
        let order = result[0];
        resolve(order.files);
      }
    })
  }).then((names)=>{
    var tmp = names.split(',');
    if(!tmp.includes(req.body.name)){
      res.json({isSuccess: false});
      reject();
    }else{
      tmp.splice(req.body.name, 1);
      names = tmp.join();
    }
    Order.UpdateImage(req.body.id, names, function(err, result){
      if(err){
        res.json({isSuccess: false});
      }else{
        res.json({isSuccess: result});
      }
    })
  })
}
exports.order_fabric_add = function(req, res){
  OrderFabrics.addFabric(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, data: result});
    }
  })
}
exports.order_fabric_update = function(req, res){
  OrderFabrics.updateFabric(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.order_fabric_get = function(req, res){
  OrderFabrics.getFabric(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, fabric: result});
    }
  })
}
exports.order_fabric_remove = function(req, res){
  OrderFabrics.removeFabric(req.body.id, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.order_fabric_list = function(req, res){
  OrderFabrics.getFabrics(req.body,function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      console.log(result);
      res.json({isSuccess: true, list: result});
    }
  })
}
exports.order_detail_add = function(req, res){
  OrderDetail.addDetail(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.order_detail_all = function(req, res){
  OrderDetail.allDetail(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: result});
    }
  })
}
exports.order_detail_get = function(req, res){
  OrderDetail.getDetail(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, detail: result[0]});
    }
  })
}
exports.order_detail_update = function(req, res){
  OrderDetail.updateDetail(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.order_detail_remove = function(req, res){
  OrderDetail.removeDetail(req.body.id, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.order_detail_remove_all = function(req, res){
  var ids = JSON.parse(req.body.ids);
  console.log(ids);
  var p = [];
  for(var i = 0; i < ids.length; i++){
    var tmp = new Promise((resolve, reject) => {
      OrderDetail.removeDetail(ids[i], function(err, result){
        if(err){
          reject();
        }else{
          resolve();
        }
      })
    })
    p.push(tmp);
  }
  Promise.all(p).then(() => {
    res.json({isSuccess: true});
  })
}

exports.group_list = function(req, res){
  var id = req.body.id, groupsize, groupproduct, groupfinish;
  new Promise((resolve, reject) => {
    SizeGroup.get({customer: id}, function(err, result){
      if(err){
        res.json({isSuccess: false});
      }else{        
        groupsize = result;        
        resolve(groupsize);
      }
    })
  }).then(()=>{
    return new Promise((resolve, reject) => {
      ProductMaterialGroup.get({customer: id}, function(err, result){
        if(err){
          res.json({isSuccess: false});
        }else{
          groupproduct = result;
          resolve(groupproduct);
        }
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      FinishMaterialGroup.get({customer: id}, function(err, result){
        if(err){
          res.json({isSuccess: false});
        }else{
          groupfinish = result;
          resolve(groupfinish);
        }
      })
    })
  }).then(()=>{    
    res.json({isSuccess: true, size: groupsize, product: groupproduct, finish: groupfinish});
  })
}

var sendNotification = function(req){
  var myClient = new OneSignal.Client({
    userAuthKey: 'ZTg5ZGM4NDItMjNiNS00NDQ0LWE2Y2EtNGYyNThlNGNmZjgy',
    // note that "app" must have "appAuthKey" and "appId" keys
    app: { appAuthKey: 'OTQ1ZjA3OTUtMWU1YS00MTFiLWIxZmMtZjUyNTA1ZjU3MzYy', appId: 'ff94eaec-20e9-4d21-bbac-e28aeb0fc792' }
  });

  var contents;
  switch (req.cookies.language){
    case 'kor':
      contents={
        en: req.body.handlername + " 이 " + req.body.buyername +"의 새 주문 " + req.body.name +"을 추가 하였습니다. "
      }
      break;
    case 'eng':
      contents={
        en: "[New Order] "+req.body.buyername + ", " + req.body.name
      }
      break;
    case 'spa':
      contents={
        en: "[New Order] "+req.body.buyername + ", " + req.body.name
      }
      break;
  }
  
  var firstNotification = new OneSignal.Notification({
    contents
  });

  firstNotification.setIncludedSegments(['All']);
  myClient.sendNotification(firstNotification, function (err, httpResponse,data) {
    if (err) {
        console.log('Something went wrong...');
    } else {
        console.log(data, httpResponse.statusCode);
    }
  });
}

var sendEmail = function(req){
  Follower.getById(req.body.buyer, function(err, result){
    if(err){
      console.log('Error while getting followers');
    }else{      
      for(var i = 0; i < result.length; i++){
        var smtpTransport = nodemailer.createTransport(smtpConfig);
        var mailOptions;
        switch (req.cookies.language){
          case 'kor':
            mailOptions={
              to : result[i].follower,
              subject : "[새 주문] "+req.body.buyername + ", " + req.body.name,
              html : req.body.handlername + " 이 " + req.body.buyername +"의 새 주문 " + req.body.name +"을 추가 하였습니다. "
              //html: "[New Order] "+body.buyername + ", " + body.name
            }
            break;
          case 'eng':
            mailOptions={
              to : result[i].follower,
              subject : "[New Order] "+req.body.buyername + ", " + req.body.name,
              html : req.body.handlername + " added new Order " + req.body.name +" for "+req.body.buyername
              //html: "[New Order] "+body.buyername + ", " + body.name
            }
            break;
          case 'spa':
            mailOptions={
              to : result[i].follower,
              subject : "[New Order] "+req.body.buyername + ", " + req.body.name,
              html : req.body.handlername + " added new Order " + req.body.name +" for "+req.body.buyername
              //html: "[New Order] "+body.buyername + ", " + body.name
            }
            break;
        }        
        
        smtpTransport.sendMail(mailOptions, function(error, response){
        });
      }
    }
  })  
}

exports.order_add = function(req, res){  
  Order.addOrder(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{      
      sendNotification(req);
      sendEmail(req);      
      res.json({isSuccess: result});
    }
  })
}
exports.order_remove = function(req, res){
  Order.removeOrder(req.body.id, function(err, result){
    if(err){
      res.redirect('/');
    }else{
      res.redirect('/dashboard/order/list');
    }
  })
}
exports.order_image_add = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(fields);
    var filename;
    if(files.file != undefined){
      filename = uniqid();
      var old_path = files.file.path;
      var file_size = files.file.size;
      var file_ext = files.file.name.split('.').pop();    
      var new_path = path.join(appRoot, '/public/uploads/order/image/', filename + '.' + file_ext);
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              console.log('uploading failure!');
            } else {
              console.log('uploading success!');
            }
          });
        });
      });
    }
    Order.addImage(fields.id, filename + '.' + file_ext, function(err, result){
      if(err){
        res.json({isSuccess:false});
      }else{
        res.json({isSuccess:true});
      }
    })
  });
}
exports.update_material_group = function(req, res){
  Order.updateMaterialGroup(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.order_update_2 = function(req, res){
  Order.order_update_2(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.excel_upload = function(req, res){  
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
              parseExcel(new_path, fields.id, function(err, result){
                if(err){
                  res.json({isSuccess: false});
                }else{
                  res.json({isSuccess: true, fails: result});
                }
              });
            }
          });
        });
      });
    }
  });
}
exports.report1 = function(req, res){
  var colors, fabric, customers;
  new Promise((resolve, reject) => {
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
  }).then(() => {
    return new Promise((resolve, reject) =>{
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
          resolve();
        }
      })
    })
  }).then(()=>{
    res.render('dashboard/order/report1', {fabric: fabric, colors: colors, role: res.role, customers: customers});    
  })
}

exports.report2 = function(req, res){
  var colors, fabric, customers;
  new Promise((resolve, reject) => {
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
  }).then(() => {
    return new Promise((resolve, reject) =>{
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
          resolve();
        }
      })
    })
  }).then(()=>{
    res.render('dashboard/order/report2', {fabric: fabric, colors: colors, role: res.role, customers: customers});    
  })
}

exports.report_list1 = function(req, res){
  console.log(req.body);
  var p = [];
  p.push(
    new Promise((resolve, reject) => {
      OrderFabrics.getAll(function(err, result){
        if(err){
          // fabrics = [];
          reject();        
        }else{
          // fabrics = result;
          resolve(result);
        }
      })
    })
  )
  p.push(
    new Promise((resolve, reject) => {
      Order.getAll(function(err, result){
        if(err){
          // orders = [];
          reject();
        }else{
          // orders = result;
          resolve(result);
        }
      })
    })
  )
  p.push(
    new Promise((resolve, reject) => {
      Report.getOrderDetail(function(err, rows) {
        if(err) {
          reject();
        } else {
          resolve(rows);
        }
      })
    })
  )
  p.push(new Promise((resolve, reject) => {
    Report.getFabricIn(function(err, rows) {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  }))
  p.push(new Promise((resolve, reject) => {
    Report.getFabricOut(function(err, rows) {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }       
    })
  }))  
  p.push(new Promise((resolve, reject) => {
    Report.getCut(function(err, rows) {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }       
    })
  }))  
  p.push(new Promise((resolve, reject) => {
    Report.getSewDaily(function(err, rows) {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }       
    })
  }))
  p.push(new Promise((resolve, reject) => {
    Report.getShipment(function(err, rows) {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }       
    })
  }))
  p.push(new Promise((resolve, reject) => {
    Report.getInspection(function(err, rows) {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }       
    })
  }))

  Promise.all(p).then(data => {    
    var orders, fabrics, details;
    var orders = data[1];
    var fabrics = data[0];
    var details = data[2];
    for(var i = 0; i < details.length; i++) {
      details[i].fabricin_yds = data[3][i].fabricin_yds;
      details[i].fabricout_yds = data[4][i].fabricout_yds;
      details[i].cut_yds = data[5][i].cut_yds;
      details[i].cut_pcs = data[5].cut_pcs;
      details[i].sew_pcs = data[6].sew_pcs;
      details[i].shipment_pcs = data[7].shipment_pcs;
      details[i].inspection_pcs = data[8].inspection_pcs;
    }
    var ret = [];
    for(var i = 0; i < orders.length; i++){
      var orderfabrics = [];
      for(var j = 0; j < fabrics.length; j++){
        if(fabrics[j].orderid == orders[i].id){
          orderfabrics.push(fabrics[j]);
        }
      }
      var orderdetails = [];
      for(var j = 0; j < details.length; j++){        
        if(details[j].orderid == orders[i].id){
          orderdetails.push(details[j]);
        }
      }
      
      //Group By Style/Color/Fabric
      var tmp = [];
      
      const compareT = function(a, b){
        var a1 = '1', b1 = '1';
        for(var k = 1; k <6; k++){
          if(a['f'+k]){
            a1 += a['f'+k];
          }
          if(b['f'+k]){
            b1 += b['f'+k];
          }
        }
        return ((a.style == b.style) && (a.color == b.color) && (a1 == b1));
      }
      
      for(var j = 0; j < orderdetails.length; j++){
        var b = false;
        for(var k = 0; k < tmp.length; k++){
          if(compareT(tmp[k], orderdetails[j])){            
            b = true;
            tmp[k].s1 = Number(tmp[k].s1)+Number(orderdetails[j].s1);
            tmp[k].s2 = Number(tmp[k].s2)+Number(orderdetails[j].s2);
            tmp[k].s3 = Number(tmp[k].s3)+Number(orderdetails[j].s3);
            tmp[k].s4 = Number(tmp[k].s4)+Number(orderdetails[j].s4);
            tmp[k].s5 = Number(tmp[k].s5)+Number(orderdetails[j].s5);
            tmp[k].s6 = Number(tmp[k].s6)+Number(orderdetails[j].s6);
            tmp[k].s7 = Number(tmp[k].s7)+Number(orderdetails[j].s7);
            tmp[k].s8 = Number(tmp[k].s8)+Number(orderdetails[j].s8);
            tmp[k].s9 = Number(tmp[k].s9)+Number(orderdetails[j].s9);
            tmp[k].s10 = Number(tmp[k].s10)+Number(orderdetails[j].s10);
            tmp[k].orderdetail_pcs = Number(tmp[k].orderdetail_pcs)+Number(orderdetails[j].orderdetail_pcs);
            tmp[k].orderdetail_yds = Number(tmp[k].orderdetail_yds)+Number(orderdetails[j].orderdetail_yds);
            tmp[k].fabricin_yds = Number(tmp[k].fabricin_yds)+Number(orderdetails[j].fabricin_yds);
            tmp[k].fabricout_yds = Number(tmp[k].fabricout_yds)+Number(orderdetails[j].fabricout_yds);
            tmp[k].cut_yds = /*Number(tmp[k].cut_yds)+*/Number(orderdetails[j].cut_yds);
            tmp[k].cut_pcs = /*Number(tmp[k].cut_pcs)+*/Number(orderdetails[j].cut_pcs);
            tmp[k].sew_pcs = Number(tmp[k].sew_pcs)+Number(orderdetails[j].sew_pcs);
            tmp[k].iron_pcs = Number(tmp[k].iron_pcs)+Number(orderdetails[j].iron_pcs);
            tmp[k].segundas = Number(tmp[k].segundas)+Number(orderdetails[j].segundas);
            tmp[k].defectos = Number(tmp[k].defectos)+Number(orderdetails[j].defectos);
            break;
          }
        }
        if(b == false){
          tmp.push(orderdetails[j]);
        }
      }

      //ret.push({ fabric: orderfabrics, detail: orderdetails, name: orders[i].name });
      ret.push({ fabric: orderfabrics, detail: tmp, name: orders[i].name, buyername: orders[i].buyername, complete: orders[i].complete });
    }
    res.json({isSuccess: true, data: ret});
  }).catch(err => {
    console.log(err);
    res.json({isSuccess: false});    
  })  
}

exports.report_list2 = function(req, res){
  console.log(req.body);
  var orders, fabrics, details;
  new Promise((resolve, reject) => {
    OrderFabrics.getAll(function(err, result){
      if(err){
        fabrics = [];
        resolve();
      }else{
        fabrics = result;
        resolve();
      }
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      Order.getAll(function(err, result){
        if(err){
          orders = [];
          resolve();
        }else{
          orders = result;
          // orders = orders.filter(v => {
          //   return v.complete != '1';
          // })
          resolve();
        }
      })
    })
  }).then(()=> {
    return new Promise((resolve, reject) => {
      Report.getAll2(function(err, result){
        if(err){
          details = [];
          resolve();
        }else{
          details = result;
          resolve();
        }
      })
    })
  }).then(() => {
    var ret = [];
    for(var i = 0; i < orders.length; i++){
      var orderfabrics = [];
      for(var j = 0; j < fabrics.length; j++){
        if(fabrics[j].orderid == orders[i].id){
          orderfabrics.push(fabrics[j]);
        }
      }
      var orderdetails = [];
      for(var j = 0; j < details.length; j++){        
        if(details[j].orderid == orders[i].id){
          orderdetails.push(details[j]);
        }
      }
      
      //Group By Style/Color/Fabric
      var tmp = [];
      
      const compareT = function(a, b){
        var a1 = '1', b1 = '1';
        for(var k = 1; k <6; k++){
          if(a['f'+k]){
            a1 += a['f'+k];
          }
          if(b['f'+k]){
            b1 += b['f'+k];
          }
        }
        return ((a.style == b.style) && (a.color == b.color) && (a1 == b1));
      }
      
      for(var j = 0; j < orderdetails.length; j++){
        var b = false;
        for(var k = 0; k < tmp.length; k++){
          if(compareT(tmp[k], orderdetails[j])){            
            b = true;
            tmp[k].s1 = Number(tmp[k].s1)+Number(orderdetails[j].s1);
            tmp[k].s2 = Number(tmp[k].s2)+Number(orderdetails[j].s2);
            tmp[k].s3 = Number(tmp[k].s3)+Number(orderdetails[j].s3);
            tmp[k].s4 = Number(tmp[k].s4)+Number(orderdetails[j].s4);
            tmp[k].s5 = Number(tmp[k].s5)+Number(orderdetails[j].s5);
            tmp[k].s6 = Number(tmp[k].s6)+Number(orderdetails[j].s6);
            tmp[k].s7 = Number(tmp[k].s7)+Number(orderdetails[j].s7);
            tmp[k].s8 = Number(tmp[k].s8)+Number(orderdetails[j].s8);
            tmp[k].s9 = Number(tmp[k].s9)+Number(orderdetails[j].s9);
            tmp[k].s10 = Number(tmp[k].s10)+Number(orderdetails[j].s10);
            tmp[k].orderdetail_pcs = Number(tmp[k].orderdetail_pcs)+Number(orderdetails[j].orderdetail_pcs);
            tmp[k].orderdetail_yds = Number(tmp[k].orderdetail_yds)+Number(orderdetails[j].orderdetail_yds);
            tmp[k].fabricin_yds = Number(tmp[k].fabricin_yds)+Number(orderdetails[j].fabricin_yds);
            tmp[k].fabricout_yds = Number(tmp[k].fabricout_yds)+Number(orderdetails[j].fabricout_yds);
            tmp[k].cut_yds = /*Number(tmp[k].cut_yds)+*/Number(orderdetails[j].cut_yds);
            tmp[k].cut_pcs = /*Number(tmp[k].cut_pcs)+*/Number(orderdetails[j].cut_pcs);
            tmp[k].sew_pcs = Number(tmp[k].sew_pcs)+Number(orderdetails[j].sew_pcs);
            tmp[k].iron_pcs = Number(tmp[k].iron_pcs)+Number(orderdetails[j].iron_pcs);
            tmp[k].segundas = Number(tmp[k].segundas)+Number(orderdetails[j].segundas);
            tmp[k].defectos = Number(tmp[k].defectos)+Number(orderdetails[j].defectos);
            break;
          }
        }
        if(b == false){
          tmp.push(orderdetails[j]);
        }
      }

      //ret.push({ fabric: orderfabrics, detail: orderdetails, name: orders[i].name });
      ret.push({ fabric: orderfabrics, detail: tmp, name: orders[i].name, buyername: orders[i].buyername, complete: orders[i].complete });
    }
    res.json({isSuccess: true, data: ret});
  })
}