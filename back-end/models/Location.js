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
	rotation: { type: [Number], required: true, default: [0, 0, 0] },
	scale: { type: Number, required: true, default: 1 },
	tilt: { type: Number, required: true, default: 0 },
	dayLength: { type: Number, required: true, default: 1 },
	inclination: { type: Number, required: true, default: 0 },
	points: { type: [Number], required: true, default: [0, 0] },
	paths: {
		type: [
			{
				from: { type: mongoose.Schema.Types.ObjectId },
				to: { type: mongoose.Schema.Types.ObjectId },
				isMajor: { type: Boolean, default: false },
				colour: { type: String, default: "#444444" },
			},
		],
		required: true,
		default: [],
	},
	data: {
		type: {
			name: { type: String },
			description: { type: [String], default: [""] },
			scaleUnit: { type: String, required: true, default: "m" },
		},
	},
});

module.exports = mongoose.model("Location", LocationSchema);
