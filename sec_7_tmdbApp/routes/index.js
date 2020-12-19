var express = require("express");
var router = express.Router();

const axios = require("axios"),
  // apiKey = "1fb720b97cc13e580c2c35e1138f90f8",
  // apiBaseUrl = "http://api.themoviedb.org/3",
  // nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`,
  apiKey = "123",
  apiBaseUrl = "http://localhost:5000",
  nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`,
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

  // nowPlayingMovies becomes a property of the res.locals object
  // thus the views have access to it & can render it
  res.render("index", { nowPlayingMovies: response.data.results });
});

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

  // due to the post method specified in the navbar.js file's form,
  // the values of the name attributes defined in the form can be used as in
  // req.body.[name attribute's value] in order to get any data provided in the form
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
