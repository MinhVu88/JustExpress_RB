var express = require("express");
var router = express.Router();

const movies = require("../data/movies");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Section 8 - Building the Movie API" });
});

router.get("/most_popular", (req, res, next) => {
  console.log("the number of movies in movies.js:", movies.length);

  let page = req.query.page;

  if (page === undefined) page = 1;

  const mostPopularMovies = movies.filter(movie => movie.most_popular),
    firstIndexPerPage = (page - 1) * 20,
    moviesPerPage = mostPopularMovies.slice(
      firstIndexPerPage,
      firstIndexPerPage + 19
    );

  res.json({ results: moviesPerPage });
});

module.exports = router;
