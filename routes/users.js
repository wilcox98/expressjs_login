var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get(
  "/:name",
  require("connect-ensure-login").ensureLoggedIn(),
  function (req, res, next) {
    res.render("home", { title: "Profile", user: req.user });
  }
);
// update user details
router.put(
  "/update" , require('connect-ensure-login').ensureLoggedIn(),
  async (req, res) => {
    // pull details from the frontend
    const { email, username, password } = req.body;
    const values = { email, username, password };
    console.log(req.body);
    // find the entry using username and update it
    /*User.findOne((err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Original Doc : ", docs);
      }
      //save the new details
      /* const data = new User(req.body);
      data.save().then((doc) => {
        console.log("Update doc ", doc);
      }); *
    });*/
    // testing
    const data = new User(req.body);
    //use find one and update
    //const a = await User.findOneAndUpdate({username}, data,{ upsert: true, omitUndefined: true,returnOriginal: false })
    //console.log(a)
    const a = req.user.username
    console.log(a)
    User.updateOne( {a},
      {data},
      { upsert: true, omitUndefined: true,new:true },
      (err, result) => {
        //console.log("err: " , err)
        console.log("Update ", result);
      }
    );
    User.findOne((err,docs) => {
      console.log("Original Doc : ", docs);
    })
    //res.send()
    res.render("home", { title: "Profile", user: req.user });
  }
);

module.exports = router;
