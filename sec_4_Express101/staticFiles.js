const express = require("express"),
  app = express(),
  port = 3000;

// app has the use() method that takes 1 arg: the built-in middleware function called express.static()
app.use(express.static("./public"));

// don't ever serve up node_modules online, this's just for demo purposes
// app.use(express.static("node_modules"));

app.listen(port, () => console.log(`The server's listening on port ${port}`));
