const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	image: String,
});

module.exports = mongoose.model("Image", ImageSchema);
