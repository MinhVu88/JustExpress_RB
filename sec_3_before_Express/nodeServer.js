/*
- The http module's createServer() method has an arg, which's a callback (http is a native Node module)

- The callback has 2 args: request (req | an object) & response (res | an oject)

- createServer() returns an object, whose listen() method takes an arg: the port to listen for http traffic

- When a client/browser makes a request to the server, it waits for a response from that server 

- Once the client receives the response, the connection is complete

- In the response, Node.js takes care of the start line but we have to deal with the header & body

- res.writeHead() handles the header & takes 2 args: the status code & an object

- res.write() handles the body

- res.end() closes the connection
*/
const http = require("http"),
  fs = require("fs"),
  port = 3000,
  homepage = fs.readFileSync("../public/index.html"),
  pic = fs.readFileSync("../public/express.jpg"),
  css = fs.readFileSync("../public/styles.css"),
  server = http.createServer((req, res) => {
    const path = req.url;

    console.log(`A request to ${path}`);

    if (path === "/") {
      res.writeHead(200, { "content-type": "text/html" });

      // res.write("<h1>Just Express by Rob Bunch | Home</h1>");

      res.write(homepage);

      res.end();
    } else if (path === "/express.jpg") {
      res.writeHead(200, { "content-type": "image/jpeg" });

      res.write(pic);

      res.end();
    } else if (path === "/styles.css") {
      res.writeHead(200, { "content-type": "text/css" });

      res.write(css);

      res.end();
    } else {
      res.writeHead(404, { "content-type": "text/html" });

      res.write("<h1>404 Page Not Found</h1>");

      res.end();
    }
  });

server.listen(port);

console.log(`The server's listening on port ${port}`);
