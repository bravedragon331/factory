var db = require('./db');

var createLine = function(factory, department, name, status, callback){
  db.query('INSERT INTO line (factory, department, name, status) values (?,?,?,?)', [factory, department, name, status], function(err){
    if(err){
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again          
          return createLine(factory, department, name, status, callback);
        }
        return callback(err);
      }
    }
    return callback(null, true);
  })
}

var addLine = function(factory, department, name, status, callback){    
  db.query('SELECT * FROM line WHERE name = ?', [name], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createLine(factory, department, name, status, callback);
    }
  });
}

var getLine = function(callback){
  db.query('SELECT l.*, f.name as fname, d.name as dname FROM line as l INNER JOIN factory as f ON l.factory=f.id INNER JOIN department as d ON l.department=d.id', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var updateLine = function(factory, department, name, status, oldname, callback){
  console.log(oldname);
  db.query('UPDATE line SET ? WHERE name = ?', [{factory: factory, department: department, name: name, status: status}, oldname], function(err, result){
    if(err)
      return callback(err);
    return callback(null);
  })
}

var removeLine = function(name, callback){
  db.query('DELETE FROM line WHERE name = ?', [name], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

var allLine = function(callback){
  db.query('SELECT * FROM line', [], function(err, rows){
    if(err)
      return callback(err);
    else
      return callback(null, rows);
  })
}
exports.addLine = addLine;
exports.getLine = getLine;
exports.updateLine = updateLine;
exports.removeLine = removeLine;
exports.allLine = allLine;