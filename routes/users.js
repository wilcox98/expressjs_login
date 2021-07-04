var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/:name', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {
    res.render('home', { title: 'Profile', user: req.user });
});
// update user details
router.put('/update', require('connect-ensure-login').ensureLoggedIn(), async (req, res) => {
    // pull details from the frontend
    const { username, email } = req.body;
    var update = {
        username,
        email,
    };
    // find by the logged in user id
    User.findByIdAndUpdate(req.user._id, update, { new:true },(err, result) => {
        if (err) console.log(err);
        if (result) {
            console.log(result);
            res.redirect('/user/' + result.username);
        }
    });
   
});
router.get('/ps/change',(req,res)=>{
  res.render('ps')
})
module.exports = router;
