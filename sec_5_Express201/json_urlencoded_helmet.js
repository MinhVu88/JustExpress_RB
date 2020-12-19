const express = require("express"),
  app = express(),
  helmet = require("helmet"),
  port = 3000;

app.use(helmet());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/x201", (req, res) => {
  console.log("-> req.headers: ", req.headers);

  /*
  - Express by itself doesn't create req.body
  
  - The request object's body property only exists as the result of calling
    Express's middleware functions, namely, express.json() & express.urlencoded()

  - Without calling those 2 pieces of middlewares, req.body is undefined

  - As a result, these 2 middleware functions are vital in collecting & 
    parsing any type of submitted data in JSON format
  */
  console.log("-> req.body: ", req.body);

  // res.send("res.send() by default sets the MIME type of text/html");

  res.json("res.json() sets the MIME type of application/json (IMPORTANT!)");
});

app.all("*", (req, res) => res.send("<h1>404 Page Not Found</h1>"));

app.listen(port, () => console.log(`The server's listening on port ${port}`));
