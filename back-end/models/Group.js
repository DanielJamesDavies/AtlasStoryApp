const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	uid: {
		type: String,
		require: true,
	},
	data: {
		type: {
			name: {
				type: String,
				require: true,
				default: "",
			},
			characters: {
				type: [
					{
						character_id: {
							type: mongoose.Schema.Types.ObjectId,
							require: true,
						},
					},
				],
				require: true,
				default: [],
			},
		},
		require: true,
		default: {},
	},
});

module.exports = mongoose.model("Group", GroupSchema);
