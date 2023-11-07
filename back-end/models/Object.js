const mongoose = require("mongoose");

const ObjectSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
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
			name: {
				type: String,
				default: "",
			},
			colour: { type: String, default: "#0044ff" },
			listImage: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
			overviewBackground: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
			images: { type: [mongoose.Schema.Types.ObjectId], default: [] },
			summaryItems: {
				type: [{ label: { type: String, default: "" }, text: { type: String, default: "" } }],
				default: [],
			},
			description: { type: [String], default: [""] },
			gallery: { type: [{ image: mongoose.Schema.Types.ObjectId, caption: "" }], default: [] },
			details: {
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

module.exports = mongoose.model("Object", ObjectSchema);
