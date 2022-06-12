const mongoose = require("mongoose");

const StorySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	uid: {
		type: String,
		require: true,
		min: 1,
		max: 64,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	data: {
		type: {
			title: {
				type: String,
				require: true,
				min: 1,
				max: 64,
			},
			isPrivate: {
				type: Boolean,
				require: true,
			},
			members: {
				type: [
					{
						user_id: {
							type: mongoose.Schema.Types.ObjectId,
							require: true,
						},
						type: {
							type: String,
							require: true,
						},
					},
				],
				require: true,
			},
			preferences: {
				accentColour: String,
			},
			icon: mongoose.Schema.Types.ObjectId,
			banner: mongoose.Schema.Types.ObjectId,
			cover: mongoose.Schema.Types.ObjectId,
			description: { type: [String], default: [""] },
			genres: { type: String, default: "" },
			colours: {
				accent: { type: String, default: "#0044ff" },
				accentHover: { type: String, default: "#0088ff" },
			},
			groups: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			primaryCharacters: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			characterTypes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
		},
		required: true,
	},
	date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Story", StorySchema);
