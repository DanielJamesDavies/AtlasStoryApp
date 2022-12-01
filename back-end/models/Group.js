const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	uid: {
		type: String,
		required: true,
	},
	data: {
		type: {
			name: {
				type: String,
				default: "",
			},
			characters: {
				type: [
					{
						character_id: {
							type: mongoose.Schema.Types.ObjectId,
						},
					},
				],
				default: [],
			},
		},
		default: {},
	},
});

module.exports = mongoose.model("Group", GroupSchema);
