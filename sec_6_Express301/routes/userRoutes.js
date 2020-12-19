const express = require("express");

let userRouter = express.Router();

function validateUser(req, res, next) {
  res.locals.validated = true;

  console.log("user validated");

  next();
}

userRouter.use(validateUser);

userRouter.get("/", (req, res, next) => {
  res.json({ msg: "user router works" });
});

module.exports = userRouter;
