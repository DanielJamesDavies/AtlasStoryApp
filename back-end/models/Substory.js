const mongoose = require("mongoose");

const SubstorySchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	uid: {
		type: String,
		require: true,
	},
	data: {
		type: {
			title: { type: String, require: true },
			isStoryTitleInTitle: { type: Boolean, require: true, default: true },
			isTitleOnPoster: { type: Boolean, require: true, default: true },
			colour: { type: String, default: "#0044ff" },
			number: { type: String, require: true, default: "" },
			posterBackground: {
				type: mongoose.Schema.Types.ObjectId,
				require: true,
				default: new mongoose.Types.ObjectId(),
			},
			overviewBackground: {
				type: mongoose.Schema.Types.ObjectId,
				require: true,
				default: new mongoose.Types.ObjectId(),
			},
			images: { type: [mongoose.Schema.Types.ObjectId], require: true, default: [] },
			summaryItems: {
				type: [{ label: { type: String, require: true, default: "" }, text: { type: String, require: true, default: "" } }],
				require: true,
				default: [{ label: "Genres", text: "" }],
			},
			description: { type: [String], require: true, default: [""] },
			gallery: { type: [{ image: mongoose.Schema.Types.ObjectId, caption: "" }], require: true, default: [] },
			plot: {
				type: {
					items: {
						type: [
							{
								_id: {
									type: mongoose.Schema.Types.ObjectId,
									require: true,
									default: new mongoose.Types.ObjectId(),
								},
								label: { type: String, require: true, default: "" },
								text: { type: [String], require: true, default: [""] },
								images: { type: [mongoose.Schema.Types.ObjectId], require: true, default: [] },
							},
						],
						require: true,
						default: [],
					},
					clusters: {
						type: [
							{
								_id: {
									type: mongoose.Schema.Types.ObjectId,
									require: true,
									default: new mongoose.Types.ObjectId(),
								},
								isAll: { type: Boolean, require: true, default: false },
								name: { type: String, require: true, default: "" },
								groups: {
									type: [
										{
											_id: {
												type: mongoose.Schema.Types.ObjectId,
												require: true,
												default: new mongoose.Types.ObjectId(),
											},
											name: { type: String, require: true, default: "" },
											items: { type: [mongoose.Schema.Types.ObjectId], require: true, default: [] },
										},
									],
									require: true,
									default: [],
								},
							},
						],
						require: true,
						default: [{ isAll: true, name: "All Plot Items" }],
					},
				},
				require: true,
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
			subpages: {
				type: [{ id: { type: String, require: true }, isEnabled: { type: Boolean, require: true } }],
				require: true,
				default: [],
			},
		},
		require: true,
	},
});

module.exports = mongoose.model("Substory", SubstorySchema);
