var express = require("express");
var router = express.Router();

const movies = require("../data/movies"),
  people = require("../data/people");

function requireQuery(req, res, next) {
  const searchTerm = req.query.query;

  !searchTerm ? res.json({ msg: "query is required" }) : next();
}

router.use(requireQuery);

router.get("/movie", (req, res, next) => {
  const searchTerm = req.query.query,
    results = movies.filter(
      movie =>
        movie.overview.includes(searchTerm) ||
        movie.original_title.includes(searchTerm)
    );

  res.json({ results });
});

router.get("/person", (req, res, next) => {
  const searchTerm = req.query.query,
    results = people.filter(person => person.name.includes(searchTerm));

  res.json({ results });
});

module.exports = router;
