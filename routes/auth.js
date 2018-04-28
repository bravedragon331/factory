var nodemailer = require('nodemailer');
var auth = require('../utils/auth');
var authController = require('../controller/auth');
var Token = require('../models/token');
var ResetToken = require('../models/resettoken');
var User = require('../models/user');
var smtpConfig = require('../config/smtpConfig');

var i18n = require("i18n");
// Routes for authentication (signup, login, logout)
module.exports = function(app, passport) {

  app.get('/signup', authController.signup);

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/success',
    failureRedirect: '/failure',
    failureFlash: true // Allow flash messages
  }));

  app.get('/success', function(req, res){    
    var smtpTransport = nodemailer.createTransport(smtpConfig);
    var mailOptions,host,link;
  
    const sendVerifyEmail = (token) =>{
      host=req.get('host');
      host = '35.173.53.14';
      link="http://"+host+"/verify?token="+token.token+'&id='+req.user.id;
      mailOptions={
        to : req.user.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
      }
      smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          res.render('exception', {text: 'Error while sending Verification Email.'});
        }else{
          //res.render('exception', {text: 'Verification Email was sent successfully.'});
          res.redirect('/login');
        }
      });
    };

    var id = req.user.id;

    Token.generateToken(id, function(err, token){
      if(err){
        res.render('exception', {text: 'Error while Generating Token.'});
      }
      //sendVerifyEmail(token);      
    })
    
    res.redirect('/login');
  });

  app.get('/verify', function(req, res){
    var token = req.query.token;
    var id = req.query.id;
    Token.findToken({token: token, id: id}, function(err, token){
      if(err){
        res.render('exception', {text: 'Error while verifying user. Please contact support team.'});
      }
      if(token){
        User.verify(id, function(err){
          if(err){
            res.render('exception', {text: 'Error while verifying user. Please contact support team.'});
          }
          res.redirect('/login');
        })        
      }        
    })
  })
  
  app.get('/failure', function(req, res){
    res.render('exception', {text: 'There is already same user with this email.'});
  });

  app.get('/login', authController.login);

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true // Allow flash messages
  }));

  app.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

  app.get('/forget', authController.forget);
  app.post('/forget', function(req, res){
    User.getUser(req.body.Email, function(err, user){
      if(err){
        res.render('exception', {text: 'Error while finding user'});
      }
      if(user == null){
        res.render('exception', {text: 'Cannot find user.'});
      }else{
        var smtpTransport = nodemailer.createTransport(smtpConfig);
        var mailOptions,host,link;
    
        const sendResetEmail = (token, id) =>{
          console.log(token);
          host=req.get('host');
          host = '35.173.53.14';
          link="http://"+host+"/reset?token="+token.token+'&id='+id;
          mailOptions={
            to : req.body.Email,
            subject : "Reset your password",
            html : "Hello,<br> You are receiving this email because you (or someone else) have requested the reset of the password for your account.<br>Please click on the following link, or paste this into your browser to complete the process:<br>"
              + "<a href=" +link+">Click here to verify</a>"
          };
          smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
              res.render('exception', {text: 'Error while sending message. Please contact support team.'});
            }else{
              //res.render('exception', {text: 'Message is sent successfully.'});
              res.redirect('/login');
            }
          });
        };
        var id = user.id;
        ResetToken.generateToken(id, function(err, token){
          if(err){
            res.render('exception', {text: 'Error while Generating Token.'});
          }
          sendResetEmail(token, id);
        });
      }
    })
  });

  app.get('/reset', function(req, res){
    var token = req.query.token;
    var id = req.query.id;
    ResetToken.findToken({token: token, id: id}, function(err, token){
      if(token == undefined){
        res.render('exception', {text: 'Token is not existed or expired.'})
      }else{
        res.render('reset', {id: id, token: token});
      }
    })    
  })

  app.post('/reset', function(req, res){
    var token = req.body.token;
    var id = req.body.id;
    var pwd = req.body.Password;
    ResetToken.findToken({token: token, id: id}, function(err, token){
      if(err){
        res.render('exception', {text: 'Reset Token has expired or not existed. Please try again.'});
      }
      if(token){
        User.updateUser({id: id, pwd: pwd}, function(err, user){
          if(err){
            res.render('exception', {text: 'Error while resetting password. Please try again.'});
          }else{
            if(err)
              res.render('exception', {text: 'Password is not updated. Please contact support team.'})
            else
              res.redirect('/login');
          }
        })
      }
    })    
  })

};