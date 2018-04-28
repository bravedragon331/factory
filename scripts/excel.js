var xlsx = require('node-xlsx');
var mysql    = require('mysql');

var Other     = require('../models/other');
var Fabric = require('../models/fabric');
var obj = xlsx.parse('./color.xlsx');

var fabrics= obj[0].data;
var colors = obj[1].data;

var id = 1;

var add = function(id){
  Other.addOther({code: colors[id][0], name: colors[id][1], type1: 'Color', type2: '', status: '1'}, function(err, result){    
    if(id < colors.length)
      add(++id);    
  })
}
add(id);

var id2 = 1;

var add2 = function(id2){
  Fabric.addFabric({code: fabrics[id][0], name: fabrics[id][1], status: '1'}, function(err, result){    
    if(id < colors.length)
      add(++id);
  })
}
add2(id2);