var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', function (req , res) {
	// body...
	if (req.body.username &&
		req.body.password) {
		User.authenticate(req.body.username, req.body.password), function (error, user) {
			// body...
			if (error || !user) {
				var err = new Error ('Wrong Username or Password');
				err.status = 401 ;
				return next (err);
				} else {
					req.session.userId = user_.id;
					return res.render('/profile');
				}
		}
	}
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.post('/signup', function ( res, req ) {
	// body...
	if (req.body.email &&
  req.body.username &&
  req.body.password &&
  req.body.passwordConf) {

  var userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }

  //use schema.create to insert data into the db
  User.create(userData, function (err, user) {
    if (err) {
      return next(err)
    } else {
      return res.redirect('/profile');
    }
  });
}
});

	
module.exports = router;
