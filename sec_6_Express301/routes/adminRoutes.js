const express = require("express");

let adminRouter = express.Router();

adminRouter.get("/", (req, res, next) => {
  res.json({ msg: "admin router works" });
});

module.exports = adminRouter;
