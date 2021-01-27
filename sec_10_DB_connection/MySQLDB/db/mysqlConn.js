const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "x",
  password: "x",
  database: "todo"
});

const data = 3;

// pool.query(
//   "SELECT * FROM tasks WHERE id > ?",
//   [data],
//   function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//   }
// );

module.exports = {
  query: (queryStr, params, callback) => pool.query(queryStr, params, callback)
};
