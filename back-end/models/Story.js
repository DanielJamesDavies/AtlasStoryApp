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
				default: "",
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
			icon: {
				type: mongoose.Schema.Types.ObjectId,
				require: true,
				default: new mongoose.Types.ObjectId(),
			},
			banner: {
				type: mongoose.Schema.Types.ObjectId,
				require: true,
				default: new mongoose.Types.ObjectId(),
			},
			cover: {
				type: mongoose.Schema.Types.ObjectId,
				require: true,
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
												caption: { type: String, require: true, default: "" },
											},
										],
										require: true,
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
										type: [{ type: String, require: true, default: "" }],
										require: true,
										default: [],
									},
									maxValue: { type: Number, require: true, default: 12 },
								},
								require: true,
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
		require: true,
		default: {},
	},
	date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Story", StorySchema);
