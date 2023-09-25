const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const compression = require("compression");

const port = process.env.PORT || 3001;

app.use(cors());
app.use(compression());
app.use(express.json({ limit: "500mb" }));
app.use(cookieParser());

// Mongoose Connection
mongoose
	.connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
		console.log("");
	});

// Email Transporter
const emailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
});

var isEmailTransporterVerified = false;
emailTransporter.verify((error, success) => {
	if (error) console.log("emailTransporterError", error);
	if (!error && success) isEmailTransporterVerified = true;
});

app.use("*", (req, res, next) => {
	if (emailTransporter) req.emailTransporter = emailTransporter;
	if (isEmailTransporterVerified) req.isEmailTransporterVerified = isEmailTransporterVerified;
	req.cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
		expires: new Date(Math.floor(Date.now()) + 60 * 60 * 24 * 365 * 2 * 1000),
		path: "/",
	};
	next();
});

// Routes
app.use("/api/new-id", require("./routes/NewIdRoute"));
app.use("/api/cookies-consent", require("./routes/CookiesConsentRoute"));
app.use("/api/user", require("./routes/UserRoute"));
app.use("/api/search", require("./routes/SearchRoute"));
app.use("/api/story", require("./routes/StoryRoute"));
app.use("/api/story-follow", require("./routes/StoryFollowRoute"));
app.use("/api/genre", require("./routes/GenreRoute"));
app.use("/api/group", require("./routes/GroupRoute"));
app.use("/api/character", require("./routes/CharacterRoute"));
app.use("/api/character-type", require("./routes/CharacterTypeRoute"));
app.use("/api/character-relationship", require("./routes/CharacterRelationshipRoute"));
app.use("/api/plot", require("./routes/PlotRoute"));
app.use("/api/location", require("./routes/LocationRoute"));
app.use("/api/object", require("./routes/ObjectRoute"));
app.use("/api/lore", require("./routes/LoreRoute"));
app.use("/api/spotify", require("./routes/SpotifyRoute"));
app.use("/api/image", require("./routes/ImageRoute"));

// Running the Front-End
app.use(express.static(path.join(__dirname, "../front-end/build")));
app.get("*", (req, res) => {
	res.setHeader("Cache-Control", "no-cache").sendFile(path.join(__dirname + "/../front-end/build/index.html"));
});

app.listen(port, () => {});
