const path = require("path"),
  express = require("express"),
  app = express(),
  helmet = require("helmet"),
  port = 3000,
  pic = require("./pic");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views/pug"));

function validateUser(req, res, next) {
  res.locals.validated = true;

  next();
}

app.use(validateUser);

app.get("/", (req, res, next) => {
  res.render("index", {
    msg1: "Pug Template Engine",
    msg2: "a Canadian record producer",
    pic,
    user: { name: "David Bottrill", age: 60 },
    members: [
      { name: "Maynard Keenan", age: 56, active: true },
      { name: "Adam Jones", age: 55, active: true },
      { name: "Justin Chancellor", age: 48, active: true },
      { name: "Danny Carey", age: 59, active: true },
      { name: "Paul D'Amour", age: 53, active: false }
    ]
  });
});

app.listen(port, () => console.log(`The server's listening on port ${port}`));
