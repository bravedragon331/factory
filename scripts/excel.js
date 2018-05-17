var xlsx = require('node-xlsx');

var Other     = require('../models/other');
var Const = require('../config/const');
var OrderDetail = require('../models/orderdetail');

// var obj = xlsx.parse('./color.xlsx');

// var fabrics= obj[0].data;
// var colors = obj[1].data;

// var id = 1;

// var add = function(id){
//   Other.addOther({code: colors[id][0], name: colors[id][1], type1: 'Color', type2: '', status: '1'}, function(err, result){    
//     if(id < colors.length)
//       add(++id);    
//   })
// }
// add(id);

// var id2 = 1;

// var add2 = function(id2){
//   Fabric.addFabric({code: fabrics[id][0], name: fabrics[id][1], status: '1'}, function(err, result){    
//     if(id < colors.length)
//       add(++id);
//   })
// }
// add2(id2);

var parseExcel = function(path, orderid, callback){
  var prioritycode;
  var work = Const.OrderDetailWork;
  var colos;

  new Promise((resolve, reject) => {
    Other.getOthers({type: Const.codes[10].name}, function(err, result){
      if(err){
        callback(err);
      }else{
        prioritycode = result;
        resolve();
      }
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      Other.getOthers({type: Const.codes[5].name}, function(err, result){
        if (err) {
          callback(err);
        } else {
          colors = result;
          resolve();          
        }
      })
    })
  }).then(() => {
    var exceldata = xlsx.parse(path)[0].data;
    var b = false;
    const preprocess = function(data){
      var tmp = [];
      for(var i = 0; i < 29; i++){
        if(data[i] == undefined){          
          tmp.push('');
        }else{
          if(i == 19){
            for(var j = 0; j < prioritycode.length; j++){
              if(prioritycode[j].name == data[i].toString()){
                tmp.push(prioritycode[j].code);
                tmp.push(prioritycode[j].name);
                break;
              }
            }
            if(data[i] == 'Not Selected'){
              tmp.push('-1');
              tmp.push('Not Selected');
            }
          }else if(i == 20){
            for(var j = 0; j < work.length; j++){
              if(work[j].name == data[i]){
                tmp.push(work[j].value);
              }
            }
          }else if(i == 3){
            for(var j = 0; j < colors.length; j++){
              if(colors[j].name == data[i]){
                tmp.push(colors[j].name);
                tmp.push(colors[j].code);
                b = true;
                break;
              }              
            }            
          }else{
            tmp.push(data[i]);
          }
        }
      }
      return tmp;
    }
    const add = function(index){
      console.log(exceldata[index]);
      var tmp = preprocess(exceldata[index]);      
      /************ Add New Color **************/
      if(b == false){
        Other.addOther({code: exceldata[index][3], name: exceldata[index][3], type1: 'Color', type2: 'Auto Add', status: 1}, function(err, result){
          if(err){            
            callback(err);
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
      }
      /************ Add New Color **************/
      else{
        b = false;
        var myDate = new Date((Number(tmp[2]) - (25567 + 1))*86400*1000);
        var data = {
          style: tmp[0], po: tmp[1], shipdate: myDate.getFullYear() + "-" + (myDate.getMonth() + 1 < 10? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1 ) + "-" + (myDate.getDate()<10?'0'+(myDate.getDate()): (myDate.getDate())), color: tmp[4], colorname: tmp[3], s1: tmp[5], s2: tmp[6], s3: tmp[7],
          s4: tmp[8], s5: tmp[9], s6: tmp[10], s7: tmp[11], s8: tmp[12], s9: tmp[13], s10: tmp[14], body:tmp[16], trim: tmp[17], otra1: tmp[18], otra2: tmp[19],
          priority: tmp[20], priorityname: tmp[21], work: tmp[22], unit: tmp[23], f1: tmp[24], f2: tmp[25], f3: tmp[26], f4: tmp[27], f5: tmp[28], id: orderid
        }
        OrderDetail.addDetail(data, function(err, result){
          if(err){
            console.log(err);
            callback(err);
          }else{
            if(index < exceldata.length -1){
              add(index+1);
            }else{
              callback(null, true);
            }
          }
        });
      }      
    }
    add(2);
  })
}

module.exports = parseExcel;