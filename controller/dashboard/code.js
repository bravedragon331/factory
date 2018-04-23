var Yarn = require('../../models/yarn');
var Fabric = require('../../models/fabric');
var SubMaterial = require('../../models/submaterial');
var Others = require('../../models/other');
var Const = require('../../config/const');

exports.yarn = function(req, res){
  Yarn.getYarns(function(err, result){
    if(err){
      res.redirect('/');
    }else{
      res.render('dashboard/codes/yarn', {yarn: result});
    }
  })  
}

exports.yarn_add = function(req, res){
  Yarn.addYarn(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.yarn_update = function(req, res){
  Yarn.updateYarn(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.yarn_remove = function(req, res){
  Yarn.removeYarn(req.body.code, function(err){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.fabric = function(req, res){
  Fabric.getFabrics(function(err, result){
    if(err){
      res.redirect('/');
    }else{
      res.render('dashboard/codes/fabric', {fabric: result});
    }
  })  
}

exports.fabric_add = function(req, res){
  Fabric.addFabric(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.fabric_update = function(req, res){
  Fabric.updateFabric(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.fabric_remove = function(req, res){
  Fabric.removeFabric(req.body.code, function(err){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.submaterial = function(req, res){
  SubMaterial.getSubMaterials(function(err, result){
    if(err){
      res.redirect('/');
    }else{
      res.render('dashboard/codes/submaterial', {submaterial: result});
    }
  })  
}

exports.submaterial_add = function(req, res){
  SubMaterial.addSubMaterial(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.submaterial_update = function(req, res){
  SubMaterial.updateSubMaterial(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}

exports.submaterial_remove = function(req, res){
  SubMaterial.removeSubMaterial(req.body.code, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.submaterial_list = function(req, res){
  SubMaterial.getSubMaterialList(req.body.type, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({ isSuccess: true, list: result });
    }
  })
}

exports.others = function(req, res){
  Others.getAll(function(err, result){
    let codes = [];
    for(let i = 0; i < result.length; i++){
      if(!codes.includes(result[i].type1))
        codes.push(result[i].type1);
    }
    console.log(codes);
    res.render('dashboard/codes/others', {items: codes});
  })  
}

exports.others_list = function(req, res){
  Others.getOthers(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: result});
    }
  })
}

exports.other_remove = function(req, res){
  Others.removeOther(req.body.item, req.body.code, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.others_add = function(req, res){
  Others.addOther(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}
exports.others_update = function(req, res){
  Others.updateOther(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: result});
    }
  })
}