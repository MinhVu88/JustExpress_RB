var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.set() is how a value of the http message's header is set by the Express server
  // res.get() is how a value of the http message's header is received by the Express server
  res.set("Date", new Date(1969, 6, 20));

  res.set("Cache-Control", "no-store");

  // equivalent to "res.type('text/html')"
  res.set("Content-Type", "text/html");

  // fresh & stale belong to the req object & fresh returns true if it's not stale
  console.log("req.fresh:", req.fresh, " | req.stale:", req.stale);

  // test req.accepts()
  console.log(
    'req.accepts("html") ->',
    req.accepts("html"),
    ' | req.accepts("json") ->',
    req.accepts("json"),
    ' | req.accepts(["json", "html"]) ->',
    req.accepts(["json", "html"])
  );

  res.render("index", { title: "Express" });
});

module.exports = router;
