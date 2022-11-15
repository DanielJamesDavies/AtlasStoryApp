const mongoose = require("mongoose");

const GenreSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	name: {
		type: String,
		require: true,
		default: "",
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
});

module.exports = mongoose.model("Genre", GenreSchema);
