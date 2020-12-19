var express = require("express");
var router = express.Router();

const movieDetails = require("../data/movieDetails");

router.param("id", (req, res, next) => {
  console.log(
    `a route that contains the movie id [${req.params.id}] is accessed`
  );

  next();
});

function requireJSON(req, res, next) {
  if (req.body.value === undefined) {
    console.log('req.get("Content-Type") ->', req.get("Content-Type"));

    console.log('req.is("application/json") ->', req.is("application/json"));

    console.log("req.body.value ->", req.body.value);

    res.json({});
  } else if (!req.is("application/json")) {
    console.log('req.get("Content-Type") ->', req.get("Content-Type"));

    console.log('req.is("application/json") ->', req.is("application/json"));

    console.log("req.body.value ->", req.body.value);

    res.json({ msg: "Content-Type must be application/json" });
  } else {
    console.log('req.get("Content-Type") ->', req.get("Content-Type"));

    console.log('req.is("application/json") ->', req.is("application/json"));

    console.log("req.body.value ->", req.body.value);

    next();
  }
}

router.get("/top_rated", function (req, res, next) {
  let page = req.query.page;

  if (!page) page = 1;

  const topRatedMovies = movieDetails.sort(
      (movie1, movie2) => movie2.vote_average - movie1.vote_average
    ),
    firstIndexPerPage = (page - 1) * 20;

  res.json(topRatedMovies.slice(firstIndexPerPage, firstIndexPerPage + 19));
});

router.post("/:id/rating", requireJSON, function (req, res, next) {
  const userRating = req.body.value;

  userRating < 0.5 || userRating > 10
    ? res.json({ msg: "ERROR! Rating must be between 0.5 & 10" })
    : res.json({ msg: `Your rating is ${userRating}`, status_code: 200 });
});

router.delete("/:id/rating", requireJSON, function (req, res, next) {
  res.json({ msg: "rating removed" });
});

router.get("/:id", function (req, res, next) {
  console.log("the number of movies in movieDetails.js:", movieDetails.length);

  const id = req.params.id,
    movie = movieDetails.find(detail => detail.id === parseInt(id));

  !movie
    ? res.json({
        msg: "movie not found",
        production_companies: []
      })
    : res.json(movie);
});

module.exports = router;
