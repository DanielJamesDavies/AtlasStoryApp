const mongoose = require("mongoose");

const GenreSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
	name: {
		type: String,
		default: "",
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
	},
});

module.exports = mongoose.model("Genre", GenreSchema);
