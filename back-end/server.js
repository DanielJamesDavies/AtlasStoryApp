const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json({ limit: "500mb" }));
app.use(cors({ origin: ["http://localhost:3000", "https://atlas-story-app.netlify.app/"], methods: "*" }));
app.listen(port, () => {});

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
