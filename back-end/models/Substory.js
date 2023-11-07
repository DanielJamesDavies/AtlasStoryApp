const mongoose = require("mongoose");

const SubstorySchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	uid: {
		type: String,
		required: true,
		index: true,
	},
	data: {
		type: {
			title: { type: String, require: true },
			isStoryTitleInTitle: { type: Boolean, default: true },
			isTitleOnPoster: { type: Boolean, default: true },
			colour: { type: String, default: "#0044ff" },
			number: { type: String, default: "" },
			posterBackground: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
			overviewBackground: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
			primaryImage: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
			images: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			summaryItems: {
				type: [{ label: { type: String, default: "" }, text: { type: String, default: "" } }],
				default: [{ label: "Genres", text: "" }],
			},
			description: { type: [String], default: [""] },
			gallery: { type: [{ image: mongoose.Schema.Types.ObjectId, caption: "" }], default: [] },
			plot: {
				type: {
					items: {
						type: [
							{
								_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
								label: { type: String, default: "" },
								text: { type: [String], default: [""] },
								images: { type: [{ image: mongoose.Schema.Types.ObjectId, caption: "" }], default: [] },
							},
						],
						default: [],
					},
					clusters: {
						type: [
							{
								_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
								isAll: { type: Boolean, default: false },
								name: { type: String, default: "" },
								groups: {
									type: [
										{
											_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
											name: { type: String, default: "" },
											items: { type: [mongoose.Schema.Types.ObjectId], default: [] },
										},
									],
									default: [],
								},
							},
						],
						default: [{ isAll: true, name: "All Plot Items" }],
					},
				},
				default: {},
			},
			soundtrack: {
				playlist_id: { type: String },
				tracks: {
					type: [
						{
							id: { type: String },
							uri: { type: String },
							is_local: { type: Boolean },
							name: { type: String },
							artists: { type: String },
							album: { type: String },
							artwork_url: { type: String },
							text: { type: [String], default: [""] },
							is_removed: { type: Boolean },
						},
					],
					default: [],
				},
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
			custom_subpages: {
				type: [
					{
						type: {
							id: {
								type: mongoose.Schema.Types.ObjectId,
								required: true,
								auto: true,
							},
							name: { type: String, default: "Custom Subpage" },
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
				],
				default: [],
			},
			subpages: {
				type: [
					{
						id: { type: String },
						name: { type: String },
						isEnabled: { type: Boolean, default: true },
						isCustom: { type: Boolean, default: false },
					},
				],
				default: [],
			},
		},
	},
});

module.exports = mongoose.model("Substory", SubstorySchema);
