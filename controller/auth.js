exports.login = function(req, res){   
  res.render('sign-in', { messages: req.flash('loginMessage') });
}

exports.signup = function(req, res){
  res.render('sign-up', { messages: req.flash('loginMessage') });
}

exports.forget = function(req, res){
  res.render('forget');
}