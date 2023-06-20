const mongoose = require("mongoose");

const CharacterSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	group_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	uid: {
		type: String,
		required: true,
	},
	isPrimaryCharacter: { type: Boolean, default: false },
	character_type_id: { type: mongoose.Schema.Types.ObjectId },
	data: {
		type: {
			name: {
				type: String,
				default: "",
			},
			summaryItems: {
				type: [{ label: { type: String, default: "" }, text: { type: String, default: "" } }],
				default: [],
			},
			colour: { type: String, default: "#0044ff" },
			cardBackground: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				auto: true,
			},
			faceImage: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				auto: true,
			},
			overviewBackground: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				auto: true,
			},
			images: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			versions: {
				type: [
					{
						_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
						title: { type: String, default: "" },
						description: { type: [String], default: [""] },
						overviewForeground: {
							type: {
								image: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
								alignment: { type: String, default: "center" },
								position: { type: [Number], default: [0, 0] },
								scale: { type: Number, default: 1 },
							},
							default: {},
						},
						primaryImage: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
						gallery: { type: [{ image: mongoose.Schema.Types.ObjectId, caption: "" }], default: [] },
						psychology: {
							type: {
								items: {
									type: [
										{
											title: { type: String, default: "" },
											text: { type: [String], default: [""] },
										},
									],

									default: [],
								},
								bigFive: {
									type: {
										intellect: { type: Number, default: 50 },
										openness: { type: Number, default: 50 },
										industriousness: { type: Number, default: 50 },
										orderliness: { type: Number, default: 50 },
										compassion: { type: Number, default: 50 },
										politeness: { type: Number, default: 50 },
										enthusiasm: { type: Number, default: 50 },
										assertiveness: { type: Number, default: 50 },
										withdrawal: { type: Number, default: 50 },
										volatility: { type: Number, default: 50 },
									},

									default: {},
								},
								isBigFiveVisible: { type: Boolean, default: true },
							},
							default: {},
						},
						biography: {
							type: [
								{
									type: {
										_id: {
											type: mongoose.Schema.Types.ObjectId,
											required: true,
											auto: true,
										},
										name: { type: String, default: "" },
										items: {
											type: [
												{
													title: { type: String },
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
											],
										},
									},
									default: {},
								},
							],
							default: [],
						},
						abilities: {
							type: [
								{
									_id: {
										type: mongoose.Schema.Types.ObjectId,
										required: true,
										auto: true,
									},
									name: { type: String, default: "New Ability" },
									primaryStatistic: {
										type: {
											label: { type: String, default: "" },
											value: { type: String, default: "" },
										},
										default: {},
									},
									items: {
										type: [
											{
												title: { type: String },
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
										],
									},
									statistics: {
										type: {
											values: {
												type: [
													{
														label: { type: String, default: "" },
														value: { type: Number, default: 0 },
													},
												],
												default: [],
											},
											maxValue: { type: Number, default: 12 },
										},
										default: {},
									},
								},
							],
							default: [],
						},
						physical: {
							type: {
								attributes: {
									type: [
										{
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
									],
								},
								outfits: {
									type: [
										{
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
									],
								},
							},
							default: {},
						},
					},
				],
				default: [{ title: "Ver. 1" }],
			},
			miscellaneous: {
				type: {
					items: {
						type: [
							{
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
						],
						default: [],
					},
				},
				default: {},
			},
			development: {
				type: {
					items: {
						type: [
							{
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
						],
						default: [],
					},
				},
				default: {},
			},
			subpages: {
				type: [{ id: { type: String }, isEnabled: { type: Boolean } }],
				default: [],
			},
		},
	},
});

module.exports = mongoose.model("Character", CharacterSchema);
