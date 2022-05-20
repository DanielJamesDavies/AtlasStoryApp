const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json({ limit: "500mb" }));
app.use(cors());

// Mongoose Connection
mongoose
	.connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	});

const server = app.listen(port, () => {
	console.log("Listening on port: " + port);
});

const userRoute = require("./routes/UserRoute");
app.use("/user", userRoute);
