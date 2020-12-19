var express = require("express");
var router = express.Router();

const axios = require("axios"),
  passport = require("passport"),
  apiKey = "1fb720b97cc13e580c2c35e1138f90f8",
  apiBaseUrl = "http://api.themoviedb.org/3",
  nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`,
  imageBaseUrl = "http://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;

  next();
});

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.set(
    "Content-Security-Policy",
    "img-src 'self' data: http://image.tmdb.org/t/p/w300/"
  );

  const response = await axios.get(nowPlayingUrl);

  console.log(response.data);

  console.log(
    "\nreq.user (logged-in GitHub profile authenticated by Passport) ->",
    req.user
  );

  res.render("index", { nowPlayingMovies: response.data.results });
});

// authentication with Passport
router.get("/login", passport.authenticate("github"));

router.get(
  "/auth",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login-failed"
  })
);

router.get("/favorites", (req, res, next) => res.json(req.user.displayName));

router.get("/movie/:id", async (req, res, next) => {
  res.set(
    "Content-Security-Policy",
    "img-src 'self' data: http://image.tmdb.org/t/p/w300/"
  );

  const movieId = req.params.id,
    movieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`,
    response = await axios.get(movieUrl);

  console.log(response.data);

  res.render("singleMovie", { movie: response.data });
});

router.post("/search", async (req, res, next) => {
  res.set(
    "Content-Security-Policy",
    "img-src 'self' data: http://image.tmdb.org/t/p/w300/"
  );

  const searchTerm = encodeURI(req.body.searchedMovie),
    category = req.body.category,
    searchedMovieUrl = `${apiBaseUrl}/search/${category}?query=${searchTerm}&api_key=${apiKey}`;

  let response = await axios.get(searchedMovieUrl);

  if (category === "person") {
    response.data.results = response.data.results[0].known_for;
  }

  res.render("index", { nowPlayingMovies: response.data.results });
});

module.exports = router;
