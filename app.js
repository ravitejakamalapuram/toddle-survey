const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const noCache = require('nocache');
const bb = require("connect-busboy");
const timeout = require("connect-timeout");
const cors = require("cors");

let app = express();
app.use(cors());
app.use(timeout("10s"));
app.use(compression());
app.use(helmet());
app.use(noCache());
app.use(bb());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../www")));

// index routes are the routes with no authentication required
app.use("/", require("./routes/auth"));

// routes without any authorization
app.use("/", require("./routes/general"));

// All sub-sequent routes needs to be authenticated using a middle-ware
app.use(require("./middlewares/auth").isAuthenticated);
app.use("/", require("./routes/survey"));

module.exports = app;