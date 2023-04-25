const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	type: { type: String, required: true, default: "reality" },
	position: { type: [Number], required: true, default: [0, 0, 0] },
	scale: { type: Number, required: true, default: 1 },
	data: {
		type: {
			name: { type: String },
			description: { type: [String], default: [""] },
		},
	},
});

module.exports = mongoose.model("Location", LocationSchema);
