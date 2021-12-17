const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const actionRoutes = require("./routes/action");
const workRoutes = require("./routes/work");
const keys = require("./config/keys");
const app = express();

mongoose
	.connect(keys.mongoURI)
	.then(() => {
		console.log("MongoDB connected");
	})
	.catch((error) => {
		console.log(error);
	});

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/action", actionRoutes);
app.use("/api/work", workRoutes);

module.exports = app;
