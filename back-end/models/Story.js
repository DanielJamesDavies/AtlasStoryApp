const mongoose = require("mongoose");

const StorySchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
	uid: {
		type: String,
		required: true,
		min: 1,
		max: 64,
		index: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
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
				type: [{ user_id: { type: mongoose.Schema.Types.ObjectId, required: true }, type: { type: String } }],
			},
			icon: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				auto: true,
			},
			banner: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				auto: true,
			},
			cover: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				auto: true,
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
			characterRelationshipTypes: {
				type: [
					{
						_id: {
							type: mongoose.Schema.Types.ObjectId,
							required: true,
							auto: true,
						},
						name: { type: String, default: "Relationship Type" },
						colour: { type: String, default: "#0044ff" },
					},
				],
			},
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
			locations: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			locationsHierarchy: { type: Object, default: [] },
			events: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			objects: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			lore: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			pronunciations: {
				type: [
					{
						type: {
							from: { type: String, default: "" },
							to: { type: String, default: "" },
						},
						default: {},
					},
				],
				default: [],
			},
		},
		default: {},
	},
	date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Story", StorySchema);
