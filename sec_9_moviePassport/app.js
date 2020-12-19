var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const session = require("express-session");

// Passport files
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

var indexRouter = require("./routes/index");

var app = express();

const helmet = require("helmet");
app.use(helmet());

// Passport config
const passportConfig = require("./passportConfig");

app.use(
  session({
    secret: "controlisanillusion",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());

app.use(passport.session());

passport.use(
  new GitHubStrategy(passportConfig, function (
    accessToken,
    refreshToken,
    profile,
    callback
  ) {
    console.log(profile);

    return callback(null, profile);
  })
);

passport.serializeUser((user, callback) => callback(null, user));
passport.deserializeUser((user, callback) => callback(null, user));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
