var db     = require('./db');

var create = function(followingid, followingemail, followeremail, followername, callback){
  db.query('INSERT INTO follower (followingid, following, follower, followername) values (?,?,?,?)', [followingid, followingemail, followeremail, followername], function(err){
    if(err){
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // If we somehow generated a duplicate user id, try again          
          return create(name, status, callback);
        }
        return callback(err);
      }
    }
    return callback(null, true);
  })
}

var add = function(followingid, followingemail, followeremail, followername, callback){
  db.query('SELECT * FROM follower WHERE following = ? AND follower = ?', [followingemail, followeremail], function(err, rows) {
    if (err){
      console.log(err);
      return callback(err);
    }
      
    if (rows.length) {
      return callback(null, false);
    } else {
      // No user exists, create the user
      return create(followingid, followingemail, followeremail, followername, callback);
    }
  });
}

var get = function(followingemail, callback){
  db.query('SELECT * FROM follower WHERE following = ?', [followingemail], function(err, rows) {
    if (err){      
      return callback(err);
    }else{
      callback(null, rows);
    }
  });
}

var getById = function(followingid, callback){
  db.query('SELECT * FROM follower WHERE followingid = ?', [followingid], function(err, rows) {
    if (err){      
      return callback(err);
    }else{
      callback(null, rows);
    }
  });
}

var remove = function(followingemail, followeremail, callback){
  db.query('DELETE FROM follower WHERE following = ? AND follower = ?', [followingemail, followeremail], function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null, true);
    }
  })
}

exports.add = add;
exports.remove = remove;
exports.get = get;
exports.getById = getById;