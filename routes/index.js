const express = require('express');
const router = express.Router();
const method = require('../controllers/passport');
const passport = require('passport');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Index' });
});
/**get login page */
router.get('/login', (req, res) => {
    const msg = req.flash('error');

    res.render('login', { title: 'Login', message: msg });
});

router.post(
    '/login',
    passport.authenticate('login', {
        // successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true,
    }),
    (req, res) => {
        res.redirect('/user/' + req.user.username);
    }
);
/**Get signup page */
router.get('/signup', (req, res, next) => {
    const msg = req.flash('error');
    res.render('signup', { title: 'Signup', message: msg });
});

router.post(
    '/signup',
    passport.authenticate('signup', {
        failureRedirect: '/signup',
        failureFlash: true,
    }),
    (req, res) => {
        res.redirect('/user/' + req.user.username);
    }
);

module.exports = router;
