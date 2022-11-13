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
	storiesNum: {
		type: String,
		default: "0",
	},
	usersFavouritedNum: {
		type: String,
		default: "0",
	},
});

module.exports = mongoose.model("Genre", GenreSchema);
