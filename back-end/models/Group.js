const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	url: {
		type: String,
		require: true,
	},
	data: {
		type: {
			name: {
				type: String,
				require: true,
			},
			characters: {
				type: [
					{
						user_id: {
							type: mongoose.Schema.Types.ObjectId,
							require: true,
						},
					},
				],
				require: true,
			},
		},
		require: true,
	},
});

module.exports = mongoose.model("Group", GroupSchema);
