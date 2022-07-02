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
			},
			summaryItems: {
				type: [{ label: { type: String, required: true }, value: { type: String, required: true } }],
				required: true,
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
						title: { type: String, required: true, default: "" },
						description: { type: [String], default: [""] },
						gallery: { type: [{ image: mongoose.Schema.Types.ObjectId, caption: "" }], required: true, default: [] },
						psychology: {
							type: {
								items: {
									type: [{ title: { type: String, required: true }, value: { type: [String], required: true, default: [""] } }],
									required: true,
									default: [],
								},
								bigFive: {
									type: {
										intellect: { type: Number, required: true, default: 50 },
										openness: { type: Number, required: true, default: 50 },
										industriousness: { type: Number, required: true, default: 50 },
										orderliness: { type: Number, required: true, default: 50 },
										compassion: { type: Number, required: true, default: 50 },
										politeness: { type: Number, required: true, default: 50 },
										enthusiasm: { type: Number, required: true, default: 50 },
										assertiveness: { type: Number, required: true, default: 50 },
										withdrawal: { type: Number, required: true, default: 50 },
										volatility: { type: Number, required: true, default: 50 },
									},
									required: true,
									default: {},
								},
							},
							required: true,
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
									name: { type: String, required: true, default: "New Ability" },
									primaryStatistic: {
										type: {
											label: { type: String, required: true, default: "" },
											value: { type: String, required: true, default: "" },
										},
										required: true,
										default: {},
									},
									items: {
										type: [
											{
												title: { type: String, required: true },
												text: { type: [String], required: true, default: [""] },
												images: {
													type: [
														{
															image: mongoose.Schema.Types.ObjectId,
															caption: { type: String, required: true, default: "" },
														},
													],
													required: true,
													default: [],
												},
												statistics: {
													type: {
														values: {
															type: [
																{
																	label: { type: String, required: true, default: "" },
																	value: { type: Number, required: true, default: 0 },
																},
															],
															required: true,
															default: [],
														},
														maxValue: { type: Number, required: true, default: 100 },
													},
													required: true,
													default: {},
												},
											},
										],
										required: true,
									},
								},
							],
							required: true,
							default: [],
						},
						physical: {
							type: {
								attributes: {
									type: [{ title: { type: String, required: true }, value: { type: [String], required: true, default: [""] } }],
									required: true,
								},
								outfits: {
									type: [{ title: { type: String, required: true }, value: { type: [String], required: true, default: [""] } }],
									required: true,
								},
							},
							required: true,
							default: {},
						},
					},
				],
				required: true,
				default: [{ title: "Ver. 1" }],
			},
			development: {
				type: {
					items: {
						type: [
							{
								title: { type: String, required: true, default: "" },
								value: { type: [String], required: true, default: [""] },
								images: {
									type: [
										{
											image: mongoose.Schema.Types.ObjectId,
											caption: { type: String, required: true, default: "" },
										},
									],
									required: true,
									default: [],
								},
							},
						],
						required: true,
						default: [],
					},
				},
				required: true,
				default: {},
			},
		},
		require: true,
	},
});

module.exports = mongoose.model("Character", CharacterSchema);
