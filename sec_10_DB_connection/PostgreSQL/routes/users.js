var express = require("express");
var router = express.Router();

const db = require("../database/db");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const query = "SELECT * FROM city_weathers";
  const data = 36;

  db.query(query, [data], (error, dbResponse) => {
    console.log(dbResponse.rows);

    res.json(dbResponse.rows);
  });
});

module.exports = router;
