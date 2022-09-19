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
			colour: { type: String, default: "#0044ff" },
			number: { type: String, require: true, default: "" },
			posterBackground: mongoose.Schema.Types.ObjectId,
			overviewBackground: mongoose.Schema.Types.ObjectId,
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
			development: {
				type: {
					items: {
						type: [
							{
								title: { type: String, require: true, default: "" },
								value: { type: [String], require: true, default: [""] },
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

module.exports = mongoose.model("Substory", SubstorySchema);
