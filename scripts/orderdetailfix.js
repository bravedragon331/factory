var Other     = require('../models/other');
var Const = require('../config/const');
var OrderDetail = require('../models/orderdetail');

var colors, details;
new Promise((resolve, reject) => {
  Other.getOthers({type: Const.codes[5].name}, function(err, result){
    if (err) {
      callback(err);
    } else {
      colors = result;
      resolve();          
    }
  })
}).then(() => {
  return new Promise((resolve, reject) => {
    OrderDetail.all(function(err, result){
      if(err){
        callback(err);
      } else {
        details = result;
        resolve();
      }
    })
  })
}).then(() => {
  const add = function(index) {
    var tmp = details[index], k;
    for(k = 0; k < colors.length; k++){
      if(colors[k].name.toLowerCase() == tmp.colorname.toLowerCase()){
        tmp.color = colors[k].code;
        tmp.colorname = colors[k].name;
        break;
      }
    }
    if(k == colors.length){
      console.log('----');
      Other.addOther({code: tmp.colorname, name: tmp.colorname, type1: 'Color', type2: 'Auto Add', status: 1}, function(err, result){
        if(err){
          console.log(err);          
        }else{
          Other.getOthers({type: Const.codes[5].name}, function(err, result){
            if (err) {
              callback(err);
            } else {
              colors = result;
              add(index);
            }
          })          
        }
      })
    }else{
      //console.log(tmp);
      OrderDetail.updateDetail(tmp, function(err, result){
        if(err){
          console.log(err);
        }else{
          if(index < details.length-1){
            add(index + 1);
          }
        }
      })
    }    
  }
  add(0);
})