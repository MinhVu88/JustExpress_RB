const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const mongoUrl = "mongodb://localhost:27017";

let db;

mongoClient.connect(mongoUrl, (error, dbConn) => {
  db = dbConn.db("electricOrNot"); // the db name
});

app.get("/", (req, res) => {
  db.collection("cars")
    .find({})
    .toArray((queryError, carResults) => {
      console.log(carResults);

      res.json(carResults);
    });
});

app.listen(port, () => console.log(`the server's listening on port ${port}`));
