const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	uid: {
		type: String,
		required: true,
	},
	data: {
		type: {
			name: {
				type: String,
				default: "",
			},
			characters: {
				type: [
					{
						character_id: {
							type: mongoose.Schema.Types.ObjectId,
						},
					},
				],
				default: [],
			},
			summaryItems: {
				type: [{ label: { type: String, default: "" }, text: { type: String, default: "" } }],
				default: [],
			},
			colour: { type: String, default: "#0044ff" },
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
						primaryImage: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
						gallery: { type: [{ image: mongoose.Schema.Types.ObjectId, caption: "" }], default: [] },
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
		default: {},
	},
});

module.exports = mongoose.model("Group", GroupSchema);
