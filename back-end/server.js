const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json({ limit: "500mb" }));
app.listen(port, () => {});
app.use(cookieParser());

// Mongoose Connection
mongoose
	.connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	});

// Routes
app.use("/api/user", require("./routes/UserRoute"));
app.use("/api/image", require("./routes/ImageRoute"));
app.use("/api/story", require("./routes/StoryRoute"));
app.use("/api/cookies-consent", require("./routes/CookiesConsentRoute"));

// Running the Front-End
if (process.env.NODE_ENV !== "development") {
	app.use(express.static(path.join(__dirname, "../front-end/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname + "/../front-end/build/index.html"));
	});
}
