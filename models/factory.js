var db     = require('./db');

// Set up Token class
var Factory = function(factory) {
  var that = Object.create(Factory.prototype);
  that.name   = factory.name;
  that.status    = factory.status;

  return that;
};

var createFactory = function(name, status, callback){
  db.query('INSERT INTO factory (name, status) values (?,?)', [name, status], function(err){
    if(err){
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again          
          return createFactory(name, status, callback);
        }
        return callback(err);
      }
    }
    return callback(null, true);
  })
}

var addFactory = function(name, status, callback){  
  db.query('SELECT * FROM factory WHERE name = ?', [name], function(err, rows) {
    if (err)
      return callback(err);
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return createFactory(name, status, callback);
    }
  });
}

var getFactory = function(callback){
  db.query('SELECT * FROM factory', [], function(err, rows) {    
    if (err)
      return callback(err);
    else
      return callback(null, rows);
  });
}

var updateFactory = function(name, status, oldname, callback){
  db.query('UPDATE factory SET ? WHERE name = ?', [{name: name, status: status}, oldname], function(err, result){
    if(err)
      return callback(err);
    return callback(null);
  })
}

var removeFactory = function(name, callback){
  db.query('DELETE FROM factory WHERE name = ?', [name], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null);
    }
  })
}

exports.addFactory = addFactory;
exports.getFactory = getFactory;
exports.updateFactory = updateFactory;
exports.removeFactory = removeFactory;