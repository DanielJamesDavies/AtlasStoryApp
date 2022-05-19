const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json({ limit: "500mb" }));
app.use(cors());

const server = app.listen(port, () => {
	console.log("Listening on port: " + port);
});

const userRoute = require("./routes/UserRoute");
app.use("/user", userRoute);
