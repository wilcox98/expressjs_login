var express = require("express");
var session = require("express-session");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo")(session);
var passport = require("passport");
var helmet = require("helmet");
var mongo = require("mongodb");
var flash = require("connect-flash");
const methodOverride = require('method-override')
require("dotenv").config();

var app = express();

//connecting to mongo
mongoose
  .connect("mongodb://localhost/express", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log(" Mongodb Connected"))
  .catch((err) => console.error(err));
// view engine setup
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "html");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(helmet());
app.use(flash());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10800000 },
  })
);
app.use(methodOverride('_method'))

app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes/index");
const user = require("./routes/users");
app.use("/", routes);
app.use("/user", user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
