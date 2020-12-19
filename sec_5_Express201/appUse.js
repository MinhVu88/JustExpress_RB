// middleware in Express is any function that has access to the req, res & next objects
const express = require("express"),
  app = express(),
  port = 3000;

/* Example #1: req ----MIDDLEWARE---> res
- Request comes in
- Validate user (sometimes)
- Store data in the DB
- If there's data from the user, we need to parse it & store it
- Send res back
*/
function validateUser(req, res, next) {
  res.locals.validated = true;

  console.log("[ The validateUser middleware ran ]");

  next();
}

// this runs validateUser on all paths & all request methods
app.use(validateUser);

// this runs validateUser on "/admin" & all request methods
app.use("/admin", validateUser);

// this runs validateUser on "/" & only on the GET request method
app.get("/", validateUser);

app.get("/", (req, res, next) => {
  res.send("<h1>Main Page</h1>");

  console.log(res.locals.validated);
});

app.get("/admin", (req, res, next) => {
  res.send("<h1>Admin Page</h1>");

  console.log(res.locals.validated);
});

app.listen(port, () => console.log(`The server's listening on port ${port}`));
