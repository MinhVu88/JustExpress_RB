var express = require("express");
var router = express.Router();
const mysqlDb = require("../db/mysqlConn");

/* GET home page. */
router.get("/", function (req, res, next) {
  const queryStr = "SELECT * FROM tasks WHERE id > ?";

  mysqlDb.query(queryStr, [3], (error, results) => {
    res.json(results);
  });
});

module.exports = router;
