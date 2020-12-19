/*
- The app object has many methods & some of them are get, post, put & delete

- These methods resemble the main HTTP verbs & main REST verbs

- They also correspond to CRUD operations: get - read | post - create | put - update | delete - delete

- Making an http request means making either a GET request or a POST request, etc

- Whenever an url is entered in a browser, a GET request to a server is made by default

- These methods take 2 args: the path & a callback to run if an http request that matches the method name
   or the verb is made to that specific path

- app also has the all() method, which accepts all http requests
*/
const express = require("express"),
  app = express(),
  port = 3000;

// app.all("/", (req, res) => {
//   res.send("<h1>Express routing demo | sec #4: Express 101</h1>");
// });

app.get("/", (req, res) => {
  console.log(req.route);

  res.send("<h1>sec #4: Express 101 | Express routing demo | GET request</h1>");
});

app.post("/", (req, res) => {
  res.send("<h1>sec #4: Express 101 | Express routing demo | POST request</h1>");
});

app.put("/", (req, res) => {});

app.delete("/", (req, res) => {});

app.listen(port, () => console.log(`The server's listening on port ${port}`));
