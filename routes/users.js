var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name', require('connect-ensure-login').ensureLoggedIn(),function(req, res, next) {
  res.send({user:req.user});
});

module.exports = router;
