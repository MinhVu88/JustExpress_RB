const path = require("path"),
  express = require("express"),
  cookieParser = require("cookie-parser"),
  app = express(),
  helmet = require("helmet"),
  port = 3000;

app.use(helmet());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use((req, res, next) => {
  if (req.query.msg === "fail") {
    res.locals.msg = "invalid username or password";
  } else {
    res.locals.msg = "";
  }

  next(); // move on to the next middleware
});

// app.param() takes 2 args: the target param in a route &
// a callback (req, res, next, target param)
app.param("l1", (req, res, next, l1) => {
  console.log(`the param found in a route: ${l1}`);

  next();
});

app.get("/", (req, res, next) => {
  res.send("<h1>Home page</h1>");
});

app.get("/login", (req, res, next) => {
  // req.query is an object whose property is every key in the query string
  // insecure/unimportant data can be placed inside a query string
  console.log(req.query);

  res.render("login");
});

app.post("/process_login", (req, res, next) => {
  // res.json(req.body);

  // reference to "req.body": json_urlencoded_helmet.js in sec_5_Express201
  // in short, req.body.username & req.body.password are user input in the form
  const username = req.body.username,
    password = req.body.password;

  if (password === "x") {
    /*
    - Check in the db if user credentials are valid

    - If they are, save the username in a cookie & redirect user to the welcome page

    - Cookie data vs session data:
      
      + Cookie data is stored entirely on the browser & the browser sends it
        to the server whenever a request is made
        
      + Session data is stored on the server & the browser is given a key for that data

      + Session data is not a built-in Express feature like cookie is, 
        so in this case, cookie is used

      + Furthermore, local storage can also be used here

    - res.cookie() takes 2 args: the cookie's name & its value
    */
    res.cookie("username", username);

    res.redirect("/welcome");
  } else {
    // in an url, "?" signals the start of the query string,
    // which consists of key-value pairs, separated by ampersands
    res.redirect("/login?msg=fail&test=false");
  }
});

app.get("/welcome", (req, res, next) => {
  // the req.cookies object has a property for every named cookie that has been set
  res.render("welcome", { username: req.cookies.username });
});

// in a route, a colon is a wildcard/param that matches anything behind /section/
// the req.params object has a property for each wildcard/param in the route
app.get("/section/:l1", (req, res, next) => {
  res.send(`<h1>/section/${req.params.l1}</h1>`);
});

// this never runs as it matches the route above
// app.get('/section/:id', (req, res, next) => {});

app.get("/section/:l1/:l2", (req, res, next) => {
  res.send(`<h1>/section/${req.params.l1}/${req.params.l2}</h1>`);
});

app.get("/statement", (req, res, next) => {
  // this renders the image in the browser (not recommended)
  // res.sendFile(path.join(__dirname, "/BankStatement.png"));

  /*
  - Instead, app.download() is recommended in this case

  - It takes 3 args: the filename, a customized name for 
    the downloaded file (optional) & a callback which's called once
    everything's done (optional & can log an error if there's any)

  - Noted: if there's an error in sending the file to the client/browser, 
    the header may already be sent, thus response can't be sent again afterwards

  - To check whether or not the header has been sent, use "res.headersSent",
    which returns true if it's been sent & false otherwise

  - res.download() sets Content-Disposition in the http header 
    & then calls res.sendFile() to actually send the file

  - Noted: res.attachment(filename, customized filename)
    is almost the same as res.download()

  - The difference is that res.attachment() only sets Content-Disposition &
    also the filename if provided
  */
  res.download(
    path.join(__dirname, "/BankStatement.png"),
    "statement.png",
    error => {
      if (error) {
        if (!res.headersSent) {
          res.redirect("/download/error");
        }
      }
    }
  );
});

app.get("/logout", (req, res, next) => {
  // res.clearCookie() takes 1 arg: the previously set cookie's name (recommended)
  res.clearCookie("username");

  res.redirect("/login");
});

app.listen(port, () => console.log(`The server's listening on port ${port}`));
