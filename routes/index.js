var express = require('express');
var router = express.Router();
var method = require('../controllers/passport');
const passport = require('passport')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/**get login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/home',
  failureRedirect:'/login',
  failureFlash: true
}));
/**Get signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
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
