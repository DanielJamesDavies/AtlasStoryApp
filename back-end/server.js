const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const compression = require("compression");
const { initializeApp } = require("firebase/app");

const port = process.env.PORT || 3001;

const os = require("os");
const networkInterfaces = os.networkInterfaces();

if (process.env.NODE_ENV === "development") {
	app.use(
		cors({
			origin: ["http://localhost:3000"].concat(
				Object.keys(networkInterfaces)
					.map((key) => networkInterfaces[key].filter((e) => e.family === "IPv4")?.map((e) => "http://" + e?.address + ":3000"))
					.flat()
			),
			credentials: true,
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
			optionsSuccessStatus: 204,
		})
	);
} else {
	app.use(cors());
}

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

// Firebase
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

// Email Transporter
const emailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
});

var isEmailTransporterVerified = false;
emailTransporter.verify((error, success) => {
	if (error) console.log("!!! Email Transporter Error: ", error);
	if (!error && success) isEmailTransporterVerified = true;
});

app.use("*", (req, res, next) => {
	if (process.env.NODE_ENV === "development") {
		res.set("Access-Control-Allow-Origin", req?.get("origin"));
		res.set("Access-Control-Allow-Credentials", "true");

		if (req.method === "OPTIONS") {
			res.set("Access-Control-Allow-Methods", "GET");
			res.set("Access-Control-Allow-Headers", "Content-Type");
			res.set("Access-Control-Max-Age", "3600");
			return res.status(204).send("");
		}
	}

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

app.get("/api/prevent-idling", (req, res) => res.send("Success"));

// Routes
app.use("/api/new-id", require("./routes/NewIdRoute"));
app.use("/api/cookies-consent", require("./routes/CookiesConsentRoute"));
app.use("/api/user", require("./routes/UserRoute"));
app.use("/api/user-follow", require("./routes/UserFollowRoute"));
app.use("/api/user-block", require("./routes/UserBlockRoute"));
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
app.use("/api/event", require("./routes/EventRoute"));
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

if (process.env.NODE_ENV !== "development") {
	setInterval(() => {
		console.log("Preventing Idling");
		fetch("https://www.atlas-story.app/api/prevent-idling", { method: "GET" });
	}, 1000 * 60 * 25);
}
