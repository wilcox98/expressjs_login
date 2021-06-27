var express = require('express');
var router = express.Router();
var method = require('../controllers/passport');
const passport = require('passport')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/**get login page */
router.get('/login', function(req, res) {
  
  const msg =  req.flash('error')
  
  res.render('login', { title: 'Express' , message: msg});
});

router.post('/login', passport.authenticate('login', {
 // successRedirect: '/home',
  failureRedirect:'/login',
  failureFlash: true
}),function (req,res) {
  res.redirect('/user/' + req.user.username)
}

);
/**Get signup page */
router.get('/signup', function(req, res, next) {
  const msg =  req.flash('error')
  res.render('signup', { title: 'Signup',message: msg });
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/home',
  failureRedirect:'/signup',
  failureFlash: true
}));

/**
 * Get the Home page
 */
router.get('/home', require('connect-ensure-login').ensureLoggedIn(), function (req,res) {
  res.json('welcome home')
})
module.exports = router;
