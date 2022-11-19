const mongoose = require("mongoose");

const Image = require("../../models/Image");

mongoose
	.connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	});

async function getImageByID(image_id) {
	const image = await Image.findById(image_id)
		.exec()
		.catch(() => false);
	if (!image) return process.send(false);
	process.send(JSON.parse(JSON.stringify(image)));
}

process.on("message", (image_id) => {
	getImageByID(image_id);
});
