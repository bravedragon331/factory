var Factory = require('../../models/factory');
var Department = require('../../models/department');
var Line = require('../../models/line');
var User = require('../../models/user');
var Auth = require('../../models/auth');
var Other = require('../../models/other');
var Const = require('../../config/const');

exports.factory = function(req, res){
  Factory.getFactory(function(err, result){    
    if(err){
      res.redirect('/');
    }else{      
      res.render('dashboard/organization/factory', {factory: result, role: res.role});
    }
  })
}
exports.factory_add = function(req, res){  
  Factory.addFactory(req.body.name, req.body.status, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result})
    }
  })
}
exports.factory_update = function(req, res){
  Factory.updateFactory(req.body.name, req.body.status, req.body.oldname, function(err){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.factory_list = function(req, res){
  Factory.getFactory(function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{      
      res.json({isSuccess: true, factory: result});
    }
  })
}
exports.factory_remove = function(req, res){
  Factory.removeFactory(req.body.name, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{      
      res.json({isSuccess: true});
    }
  })
}

exports.department = function(req, res){
  Department.getDepartment(function(err, result){
    if(err){
      res.redirect('/');
    }else{
      res.render('dashboard/organization/department', {department: result, role: res.role});
    }
  })  
}
exports.department_add = function(req, res){
  Department.addDepartment(req.body.factory, req.body.name, req.body.status, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.department_update = function(req, res){
  Department.updateDepartment(req.body.factory, req.body.name, req.body.status, req.body.oldname, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.department_list = function(req, res){
  Department.getDepartment(function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, department:result.filter(v => {return v.factory == req.body.id})})
    }
  })
}
exports.department_remove = function(req, res){
  Department.removeDepartment(req.body.name, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.line = function(req, res){
  Line.getLine(function(err, result){
    if(err){
      res.redirect('/');
    }else{
      res.render('dashboard/organization/line', {line: result, role: res.role});
    }
  })  
}
exports.line_add = function(req, res){
  Line.addLine(req.body.factory, req.body.department, req.body.name, req.body.status, function(err, result){    
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.line_update = function(req, res){
  Line.updateLine(req.body.factory, req.body.department, req.body.name, req.body.status, req.body.oldname, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.line_list = function(req, res){
  Line.getLine(function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, line: result.filter(v => {return v.department == req.body.id})});
    }
  })
}
exports.line_remove = function(req, res){
  Line.removeLine(req.body.name, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.checkemail = function(req, res){
  User.getUser(req.body.email, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result.length==0})
    }
  })
}

exports.users = function(req, res){
  Other.getOthers({type: Const.codes[2].name}, function(err, position){
    if(err){
      res.redirect('/');
    }else{
      User.getUsers(function(err, result){
        console.log(result);
        result = result.filter(v=>{
          return v.type != 2;
        })
        if(err){
          res.redirect('/');
        }else{
          res.render('dashboard/organization/users', {position: position, users: result, role: res.role});
        }
      })
    }
  })    
}
exports.user_add = function(req, res){
  User.addUser(req.body, function(err, result){    
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.user_update = function(req, res){
  User.updateUserInfo(req.body, function(err, result){
    if(err){
      res.redirect('/');
    }else{
      res.redirect('/dashboard/organization/users');
    }
  })
}
exports.user_auth = function(req, res){
  var user, position;
  new Promise((resolve, reject) => {
    Other.getOthers({type: Const.codes[2].name}, function(err, result){
      if(err){
        res.redirect('/');
      }else{
        position = result;
        resolve(position);
      }
    })
  }).then(() =>{
    User.getUser(req.body.email,function(err, result){
      if(err){
        res.redirect('/');
      }else{
        let id = result.id;
        user = result;
        Auth.getAuths(id, function(err, result){
          if(err){
            res.redirect('/');
          }else{
            console.log(result);
            res.render('dashboard/organization/user_auth', {id: id, pages: Const.pages, auths: result, user: user, position: position, role: res.role});
          }
        })
      }    
    })  
  });
}
exports.add_auth = function(req, res){
  Auth.addAuth(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.update_auth = function(req, res){
  Auth.updateAuth(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.remove_auth = function(req, res){
  Auth.removeAuth(req.body.index, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}