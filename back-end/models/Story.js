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
			icon: mongoose.Schema.Types.ObjectId,
			banner: mongoose.Schema.Types.ObjectId,
			cover: mongoose.Schema.Types.ObjectId,
			description: { type: [String], default: [""] },
			genres: { type: String, default: "" },
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
			changeLog: {
				type: [
					{
						content_type: { type: String, default: "" },
						content_id: mongoose.Schema.Types.ObjectId,
						title: { type: String, default: "" },
						path: { type: [String], default: [] },
						date_changed: { type: Date, default: Date.now },
					},
				],
				default: [],
			},
		},
		require: true,
	},
	date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Story", StorySchema);
