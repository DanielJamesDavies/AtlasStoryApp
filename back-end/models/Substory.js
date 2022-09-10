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
	character_type_id: mongoose.Schema.Types.ObjectId,
	data: {
		type: {
			name: {
				type: String,
				require: true,
			},
			colour: { type: String, default: "#0044ff" },
			number: { type: String, require: true },
			posterBackground: mongoose.Schema.Types.ObjectId,
			overviewBackground: mongoose.Schema.Types.ObjectId,
			images: { type: [mongoose.Schema.Types.ObjectId], require: true, default: [] },
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

module.exports = mongoose.model("Substory", SubstorySchema);
