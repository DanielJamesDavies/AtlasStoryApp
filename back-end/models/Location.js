const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
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
	},
	type: { type: String, required: true, default: "reality" },
	position: { type: [Number], required: true, default: [0, 0, 0] },
	rotation: { type: [Number], required: true, default: [0, 0, 0] },
	scale: { type: Number, required: true, default: 1 },
	tilt: { type: Number, required: true, default: 0 },
	dayLength: { type: Number, required: true, default: 1 },
	inclination: { type: Number, required: true, default: 0 },
	points: { type: [Number], required: true, default: [0, 0] },
	paths: {
		type: [
			{
				from: { type: mongoose.Schema.Types.ObjectId },
				to: { type: mongoose.Schema.Types.ObjectId },
				isMajor: { type: Boolean, default: false },
				colour: { type: String, default: "#444444" },
			},
		],
		required: true,
		default: [],
	},
	data: {
		type: {
			name: { type: String },
			colour: { type: String, default: "#0044ff" },
			description: { type: [String], default: [""] },
			scaleUnit: { type: String, required: true, default: "m" },
			borders: { type: [[[Number]]], default: [] },
			mapImage: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				auto: true,
			},
			mapImageComponents: {
				type: String,
				required: true,
				default: ""
			},
			overviewBackground: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				auto: true,
			},
			images: { type: [mongoose.Schema.Types.ObjectId], default: [] },
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
			events: {
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

module.exports = mongoose.model("Location", LocationSchema);
