const mongoose = require("mongoose");

const CharacterSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	group_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	uid: {
		type: String,
		require: true,
	},
	isPrimaryCharacter: {
		type: Boolean,
		require: true,
	},
	character_type_id: mongoose.Schema.Types.ObjectId,
	data: {
		type: {
			name: {
				type: String,
				require: true,
				default: "",
			},
			summaryItems: {
				type: [{ label: { type: String, require: true, default: "" }, text: { type: String, require: true, default: "" } }],
				require: true,
				default: [],
			},
			colour: { type: String, default: "#0044ff" },
			cardBackground: mongoose.Schema.Types.ObjectId,
			overviewBackground: mongoose.Schema.Types.ObjectId,
			images: { type: [mongoose.Schema.Types.ObjectId], require: true, default: [] },
			versions: {
				type: [
					{
						_id: {
							type: mongoose.Schema.Types.ObjectId,
							require: true,
							default: new mongoose.Types.ObjectId(),
						},
						title: { type: String, require: true, default: "" },
						description: { type: [String], default: [""] },
						gallery: { type: [{ image: mongoose.Schema.Types.ObjectId, caption: "" }], require: true, default: [] },
						psychology: {
							type: {
								items: {
									type: [
										{
											title: { type: String, require: true, default: "" },
											text: { type: [String], require: true, default: [""] },
										},
									],
									require: true,
									default: [],
								},
								bigFive: {
									type: {
										intellect: { type: Number, require: true, default: 50 },
										openness: { type: Number, require: true, default: 50 },
										industriousness: { type: Number, require: true, default: 50 },
										orderliness: { type: Number, require: true, default: 50 },
										compassion: { type: Number, require: true, default: 50 },
										politeness: { type: Number, require: true, default: 50 },
										enthusiasm: { type: Number, require: true, default: 50 },
										assertiveness: { type: Number, require: true, default: 50 },
										withdrawal: { type: Number, require: true, default: 50 },
										volatility: { type: Number, require: true, default: 50 },
									},
									require: true,
									default: {},
								},
							},
							require: true,
							default: {},
						},
						abilities: {
							type: [
								{
									_id: {
										type: mongoose.Schema.Types.ObjectId,
										require: true,
										default: new mongoose.Types.ObjectId(),
									},
									name: { type: String, require: true, default: "New Ability" },
									primaryStatistic: {
										type: {
											label: { type: String, require: true, default: "" },
											value: { type: String, require: true, default: "" },
										},
										require: true,
										default: {},
									},
									items: {
										type: [
											{
												title: { type: String, require: true },
												text: { type: [String], require: true, default: [""] },
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
										],
										require: true,
									},
									statistics: {
										type: {
											values: {
												type: [
													{
														label: { type: String, require: true, default: "" },
														value: { type: Number, require: true, default: 0 },
													},
												],
												require: true,
												default: [],
											},
											maxValue: { type: Number, require: true, default: 12 },
										},
										require: true,
										default: {},
									},
								},
							],
							require: true,
							default: [],
						},
						physical: {
							type: {
								attributes: {
									type: [
										{
											title: { type: String, require: true, default: "" },
											text: { type: [String], require: true, default: [""] },
										},
									],
									require: true,
								},
								outfits: {
									type: [
										{
											title: { type: String, require: true, default: "" },
											text: { type: [String], require: true, default: [""] },
										},
									],
									require: true,
								},
							},
							require: true,
							default: {},
						},
					},
				],
				require: true,
				default: [{ title: "Ver. 1" }],
			},
			development: {
				type: {
					items: {
						type: [
							{
								title: { type: String, require: true, default: "" },
								text: { type: [String], require: true, default: [""] },
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
						],
						require: true,
						default: [],
					},
				},
				require: true,
				default: {},
			},
		},
		require: true,
	},
});

module.exports = mongoose.model("Character", CharacterSchema);
