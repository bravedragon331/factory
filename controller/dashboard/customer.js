var Const = require('../../config/const');
var Customer = require('../../models/customer');
var Others = require('../../models/other');
var Users = require('../../models/user');
var SubMaterial = require('../../models/submaterial');
var SizeGroup = require('../../models/sizegroup');
var ProductMaterialGroup = require('../../models/productmaterialgroup');
var FinishMaterialGroup = require('../../models/finishmaterialgroup');
var Follower = require('../../models/follower');

var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var uniqid = require('uniqid');

exports.new = function(req, res){
  //Customer Type 6
  Others.getOthers({type: Const.codes[6].name}, function(err, type){
    if(err){
      res.redirect('/');
    }else{
      res.render('dashboard/customer/new', {type: type});
    }
  })
}

exports.list = function(req, res){
  Others.getOthers({type: Const.codes[6].name}, function(err, type){
    if(err){
      res.redirect('/');
    }else{
      Customer.list(function(err, result){
        if(err){
          res.redirect('/');
        }else{
          console.log(type);
          res.render('dashboard/customer/list', {list: result, type: type});
        }
      })        
    }
  })  
}

exports.add = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var profileimagename;
    if(files.profileimage != undefined){
      profileimagename = uniqid();
      var old_path = files.profileimage.path;
      var file_size = files.profileimage.size;
      var file_ext = files.profileimage.name.split('.').pop();    
      var new_path = path.join(appRoot, '/public/uploads/customer/profile/', profileimagename + '.' + file_ext);
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
    Customer.add(fields, profileimagename, function(err, result){
      if(err){
        res.redirect('/dashboard/customer/add');
      }else{
        res.redirect('/dashboard/customer/list');
      }
    })
  });
}

exports.update = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var profileimagename;
    if(files.profileimage != undefined){
      profileimagename = uniqid();
      var old_path = files.profileimage.path;
      var file_size = files.profileimage.size;
      var file_ext = files.profileimage.name.split('.').pop();    
      var new_path = path.join(appRoot, '/public/uploads/customer/profile/', profileimagename + '.' + file_ext);
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
    Customer.update(fields, profileimagename, function(err, result){
      if(err){
        res.redirect('/dashboard/customer/add');
      }else{
        res.redirect('/dashboard/customer/list');
      }
    })
  });
}

exports.edit = function(req, res){
  //Customer Type
  var type, size, info, sizegroup, material, users;
  new Promise((resolve, reject) => {
    Others.getOthers({type: Const.codes[6].name}, function(err, result){
      if(err){
        res.redirect('/');
      }else{
        type = result;
        resolve(type);
      }
    })
  }).then(() =>{
    return new Promise((resolve, reject) => {
      Others.getOthers({type: Const.codes[7].name}, function(err, result){
        if(err){
          res.redirect('/');
        }else{
          size = result;
          resolve(size);
        }
      })
    });
  }).then(() =>{
    return new Promise((resolve, reject) => {
      SubMaterial.getSubMaterials(function(err, result){
        if(err){
          res.redirect('/');
        }else{
          material = result;
          resolve(material);
        }
      })
    });
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      Users.getUsers(function(err, result){
        if(err){
          res.redirect('/');
        }else{
          users = result;
          resolve();
        }
      })
    })
  }).then(() =>{
    return new Promise((resolve, reject)=>{
      Customer.get(req.body, function(err, result){
        if(err){
          res.redirect('/');
        }
        else{
          info = result[0];
          resolve();
        }
      }); 
    })    
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      Follower.get(info.email, function(err, result){
        if(err){
          res.redirect('/');
        }else{
          console.log(result);
          res.render('dashboard/customer/edit', {info: info, type: type, size: size, material: material, users: users, followers: result});
          resolve();
        }
      })
    })
  })
}

exports.sizegroup_add = function(req, res){
  SizeGroup.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }    
  })  
}
exports.sizegroup_update = function(req, res){
  SizeGroup.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }    
  })  
}
exports.sizegroup_remove = function(req, res){
  SizeGroup.remove(req.body.customer, req.body.oldcode, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }    
  })  
}
exports.sizegroup_list = function(req, res){
  SizeGroup.get(req.body, function(err, result){    
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list:result});
    }        
  })
}

exports.productmaterialgroup_add = function(req, res){
  ProductMaterialGroup.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }    
  })  
}
exports.productmaterialgroup_update = function(req, res){
  ProductMaterialGroup.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }    
  })  
}
exports.productmaterialgroup_remove = function(req, res){
  ProductMaterialGroup.remove(req.body.oldcode, req.body.customer, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }    
  })  
}
exports.productmaterialgroup_list = function(req, res){
  ProductMaterialGroup.get(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list:result});
    }    
  })
}

exports.finishmaterialgroup_add = function(req, res){
  FinishMaterialGroup.add(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }    
  })  
}
exports.finishmaterialgroup_update = function(req, res){
  FinishMaterialGroup.update(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }    
  })  
}
exports.finishmaterialgroup_remove = function(req, res){
  FinishMaterialGroup.remove(req.body.oldcode, req.body.customer, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }    
  })  
}
exports.finishmaterialgroup_list = function(req, res){
  FinishMaterialGroup.get(req.body, function(err, result){    
    res.json({isSuccess: true, list:result});
  })
}

exports.follower_add = function(req, res){
  Follower.add(req.body.followingid, req.body.followingemail, req.body.followeremail, req.body.followername, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.follower_remove = function(req, res){
  Follower.remove(req.body.followingemail, req.body.followeremail, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}