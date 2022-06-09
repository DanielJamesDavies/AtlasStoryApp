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
	url: {
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
			description: { type: [String], default: [""] },
			colour: { type: String, default: "#0044ff" },
			cardBackground: mongoose.Schema.Types.ObjectId,
			overviewBackground: mongoose.Schema.Types.ObjectId,
			versions: {
				type: [
					{
						_id: {
							type: mongoose.Schema.Types.ObjectId,
							require: true,
						},
						title: { type: String, required: true, default: "" },
						gallery: { type: [mongoose.Schema.Types.ObjectId], required: true, default: [] },
						psychology: {
							type: {
								items: {
									type: [{ title: { type: String, required: true }, value: { type: [String], required: true } }],
									required: true,
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
									name: { type: String, required: true },
									items: {
										type: [{ title: { type: String, required: true }, value: { type: [String], required: true } }],
										required: true,
									},
									stats: {
										type: {
											power: { type: Number, required: true, default: 50 },
											control: { type: Number, required: true, default: 50 },
											stamina: { type: Number, required: true, default: 50 },
											durability: { type: Number, required: true, default: 50 },
											agility: { type: Number, required: true, default: 50 },
											rapidity: { type: Number, required: true, default: 50 },
											range: { type: Number, required: true, default: 50 },
										},
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
									type: [{ title: { type: String, required: true }, value: { type: [String], required: true } }],
									required: true,
								},
								outfits: {
									type: [{ title: { type: String, required: true }, value: { type: [String], required: true } }],
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
		},
		require: true,
	},
});

module.exports = mongoose.model("Character", CharacterSchema);
