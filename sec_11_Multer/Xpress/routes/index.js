// https://www.npmjs.com/package/multer
const fs = require("fs");
var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images/uploads" });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/formData", upload.single("fsociety"), (req, res, next) => {
  console.log(req.file);

  const newPath = `public/images/uploads/${req.file.originalname}${Date.now()}`;

  fs.rename(req.file.path, newPath, error => {
    if (error) throw error;

    res.json("file uploaded");
  });

  // res.json({
  //   field: req.body,
  //   image: req.file
  // });
});

module.exports = router;
