// express is a 3rd-party module
// app is the createApplication() function defined in node_modules/express/lib/express.js
const path = require("path"),
  staticFilesPath = `${__dirname}/index.html`,
  express = require("express"),
  app = express(),
  port = 3000;

console.log(staticFilesPath);

// serve up static files
app.use(express.static("./public"));

// all() is an express method that takes 2 args: route & a callback that's called if the route's requested
// in all(), express handles the basic header data (content-type, mime types & status code) & calling end()
app.all("/", (req, res) => {
  // res.send("<h1>Home page</h1>");

  res.sendFile(path.join(staticFilesPath));
});

app.all("*", (req, res) => res.send("<h1>404 Page Not Found</h1>"));

app.listen(port, () => console.log(`The server's listening on port ${port}`));
