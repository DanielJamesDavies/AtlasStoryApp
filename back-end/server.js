const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(express.json({ limit: "500mb" }));
const allowedOrigins = ["http://localhost:3000", "https://atlas-story-app.netlify.app"];
app.use(cors({ origin: allowedOrigins, methods: "GET, PUT, POST, DELETE, HEAD, OPTIONS", credentials: true, maxAge: 60 }));
app.listen(port, () => {});
app.all("*", function (req, res, next) {
	if (allowedOrigins.includes(req.headers.origin)) res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Set-Cookie, Accept");
	res.header("Access-Control-Expose-Headers", "*, Authorization");
	next();
});
app.use(cookieParser());
app.set("trust proxy", 1);

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
app.use("/user", require("./routes/UserRoute"));
app.use("/image", require("./routes/ImageRoute"));
