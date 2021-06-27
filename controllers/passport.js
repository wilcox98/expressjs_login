const passport = require("passport");
const bCrypt = require("bcrypt");
const Users = require('../models/user');
const Strategy = require('passport-local').Strategy;

/**
 * async handler for express
 */
//const asyncHandler = require('express-async-handler')

//router.locals.moment = moment;
/**
 * cb - callback
 */
//login setup
passport.use('login', new Strategy({passReqToCallBack: true},
  function (req,username, password, cb) {
    //console for pass and username
    console.log(username, password)
    Users.findOne({ 'username': username }, function (err, user) {
      if (err) {
        //console.log(err);
        return cb(err);
      }
      if (!user) {
        //if username does not exists log error
        //return cb(null, false);
        console.log('User Not Found with username ' + username);
        //req.flash({message :'User not found'})
        return cb(null, false, { message: 'Invalid username or password.'});
      }
      if (!hashPassword(user,password)) {
        //wrong password handling
        console.log('Invalid Password');
        return cb(null, false,  { message: 'Invalid username or password.'} ); // redirect back to login page 
      }
      //when user and password match and return sucess
      return cb(null, user);
    });
    const hashPassword = function(user,password){
      return bCrypt.compareSync(password , user.password)
    }
  }));
//register setup
passport.use('signup', new Strategy({passReqToCallback : true},
  function (req,username, password, cb) {
    findOrCreateUser = function () {
      //query the db and find any user
      Users.findOne({ 'username': username }, function (err, user) {
        if (err) {
          console.log(err);
          return cb(err);
        }
        //if the user exists send a message 
        if (user) {
          console.log('the user exists ' + username);
          return cb(null, false , {message: 'The username exists'});
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new Users();

          // set the user's local credentials
          newUser.username = username;
          //create hash for the password
          newUser.password = createHash(password);
         // newUser.email = req.params('email');
          newUser.email = req.body.email
         // newUser.firstname = req.params('firstname');
         newUser.firstname = req.body.firstname;
          //newUser.secondname = req.params('secondname');
          newUser.secondname = req.body.secondname;

          //save the new user
          newUser.save(function (err) {
            if (err) {
             // console.log('Error in Saving user: ' + err);
              throw err;
            }
            //console.log('User Registration succesfull');
            return cb(null, newUser, {message: 'User Registration succesful'});
          })
        }
      })
    }
    // Delay the execution of findOrCreateUser and execute the method
    // in the next tick of the event loop
    process.nextTick(findOrCreateUser);
    //create a hash 
    var createHash = function(password){
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }
  }
));
//serialize 
passport.serializeUser(function (user, cb) {
 // console.log('serializing user: ');console.log(user._id);
  cb(null, user._id);
});
//deserialize
passport.deserializeUser(function (id, cb) {
  Users.findById(id, function (err, user) {
    if (err) {
      console.log(err);
      return cb(err);
    }
    //console.log('deserializing user:',user._id);
    cb(null, user);
  });
});

