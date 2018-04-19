var db = require('./db');

var createDepartment = function(factory, name, status, callback){
  db.query('INSERT INTO department (factory, name, status) values (?,?,?)', [factory, name, status], function(err){
    if(err){
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again          
          return createDepartment(factory, name, status, callback);
        }
        return callback(err);
      }
    }
    return callback(null, true);
  })
}

var addDepartment = function(factory, name, status, callback){  
  db.query('SELECT * FROM department WHERE name = ?', [name], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createDepartment(factory, name, status, callback);
    }
  });
}

var getDepartment = function(callback){
  db.query('SELECT d.*, f.name as fname FROM department as d JOIN factory as f ON d.factory=f.id', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var updateDepartment = function(factory, name, status, oldname, callback){
  db.query('UPDATE department SET ? WHERE name = ?', [{factory: factory, name: name, status: status}, oldname], function(err, result){
    if(err)
      return callback(err);
    return callback(null);
  })
}

var removeDepartment = function(name, callback){
  db.query('DELETE FROM department WHERE name = ?', [name], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

exports.addDepartment = addDepartment;
exports.getDepartment = getDepartment;
exports.updateDepartment = updateDepartment;
exports.removeDepartment = removeDepartment;