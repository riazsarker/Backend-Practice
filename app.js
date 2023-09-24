const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const errorMiddleware = require("./backend/middleware/error");

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  fileUpload({ limits: { fieldSize: 50 * 1024 * 1024 }, useTempFiles: true })
);
app.use(cors({ }));

// //Route Imports
// const user = require("./backend/routes/authRoutes");
// const subadmin = require("./backend/routes/hrRoutes");
// const manager = require("./backend/routes/managerRoutes");

// app.use("/api/v1", user);
// app.use("/api/v1", subadmin);
// app.use("/api/v1", manager);

app.use(errorMiddleware);

module.exports = app;