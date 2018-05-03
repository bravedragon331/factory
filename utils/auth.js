var Auth = require('../models/auth');
// Route middleware to make sure a user is logged in
var requireLogin = function(req, res, next) {
	
  // If user is authentication in the session, carry on
  if (req.isAuthenticated()){
    Auth.getAuths(req.user.id, function(err, result){
      if(err){
        res.redirect('/login');
      }else{
        req.auth = result;
        return next();
      }
    })    
  }else{
    // If they aren't, redirect them to the login page
    res.redirect('/login');
  }
};
var requireRole = function(pageid){
  return function(req, res, next){
    if(pageid == 0){
      res.role = req.auth;
    }
    for(var i = 0; i < req.auth.length; i++){
      if(req.auth[i].page == pageid){
        res.role = req.auth;
      }
    }
    if(res.role == undefined){
      res.redirect('/');
    }else{
      next();
    }    
  }
}
// Route middleware to redirect a logged in user to their profile
var alreadyLoggedIn = function(req, res, next) {  
  // If user is authentication in the session, send them to their profile instead
  if (req.isAuthenticated())
    res.redirect('/dashboard');
  else
    return next();
};

exports.requireLogin = requireLogin;
exports.alreadyLoggedIn = alreadyLoggedIn;
exports.requireRole = requireRole;