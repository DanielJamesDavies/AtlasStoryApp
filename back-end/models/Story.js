const mongoose = require("mongoose");

const StorySchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
	uid: {
		type: String,
		required: true,
		min: 1,
		max: 64,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
	},
	data: {
		type: {
			title: {
				type: String,
				min: 1,
				max: 64,
				default: "",
			},
			isPrivate: {
				type: Boolean,
				default: false,
			},
			members: {
				type: [{ user_id: { type: mongoose.Schema.Types.ObjectId }, type: { type: String } }],
			},
			icon: {
				type: mongoose.Schema.Types.ObjectId,
				default: new mongoose.Types.ObjectId(),
			},
			banner: {
				type: mongoose.Schema.Types.ObjectId,
				default: new mongoose.Types.ObjectId(),
			},
			cover: {
				type: mongoose.Schema.Types.ObjectId,
				default: new mongoose.Types.ObjectId(),
			},
			description: { type: [String], default: [""] },
			genres: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			colours: {
				accent: { type: String, default: "#0044ff" },
				accentHover: { type: String, default: "#0088ff" },
			},
			notes: {
				type: [
					{
						uid: { type: String, default: "" },
						items: [
							{
								type: {
									title: { type: String, default: "" },
									text: { type: [String], default: [""] },
									images: {
										type: [
											{
												image: mongoose.Schema.Types.ObjectId,
												caption: { type: String, default: "" },
											},
										],

										default: [],
									},
								},
							},
						],
					},
				],
				default: [],
			},
			groups: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			primaryCharacters: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			characterTypes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			characterPreferences: {
				type: {
					abilities: {
						type: {
							defaultStatistics: {
								type: {
									labels: {
										type: [{ type: String, default: "" }],
										default: [],
									},
									maxValue: { type: Number, default: 12 },
								},
								default: {},
							},
						},
						default: {},
					},
				},
				default: {},
			},
			substories: { type: [mongoose.Schema.Types.ObjectId], default: [] },
		},
		default: {},
	},
	date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Story", StorySchema);
