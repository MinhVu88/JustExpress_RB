const path = require("path"),
  express = require("express"),
  app = express(),
  helmet = require("helmet"),
  port = 3000,
  pic = require("./pic");

app.use(helmet());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs"); // the specified view engine
app.set("views", path.join(__dirname, "./views/ejs")); // the file's location

function validateUser(req, res, next) {
  res.locals.validated = true;

  next();
}

app.use(validateUser);

app.get("/", (req, res, next) => {
  /* To use res.render():
    - Activate Express app

    - Define a view engine (EJS, Mustache, Handlebars, Pug)

    - res.render() is defined in 1 of the routes

    - 2 args are passed to res.render(): the file to use & the data sent to that file

    - The data is appended to res.locals

    - Express uses the specified view engine to parse the file ->
      that means Express takes html, css & js & combines them in that view engine
    
    - The final result of this process is the compiled product of html, css & js ->
      things that the browser can read
    */
  res.render("index", {
    msg1: "Success!",
    msg2: "Failure!",
    pic
  }); // the file's name
});

app.get("/about", (req, res, next) => {
  res.render("about", { title: "About page" });
});

app.listen(port, () => console.log(`The server's listening on port ${port}`));
