const path = require("path"),
  express = require("express"),
  app = express(),
  helmet = require("helmet"),
  port = 3000,
  adminRouter = require("./routes/adminRoutes"),
  userRouter = require("./routes/userRoutes");

app.use(helmet());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", adminRouter);

app.use("/user", userRouter);

app.listen(port, () => console.log(`The server's listening on port ${port}`));
