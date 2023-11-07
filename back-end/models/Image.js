const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
	image: String,
	user_id: mongoose.Schema.Types.ObjectId,
	story_id: mongoose.Schema.Types.ObjectId,
	character_id: mongoose.Schema.Types.ObjectId,
	group_id: mongoose.Schema.Types.ObjectId,
	character_type_id: mongoose.Schema.Types.ObjectId,
	substory_id: mongoose.Schema.Types.ObjectId,
	location_id: mongoose.Schema.Types.ObjectId,
	location_map_version_id: mongoose.Schema.Types.ObjectId,
	event_id: mongoose.Schema.Types.ObjectId,
	object_id: mongoose.Schema.Types.ObjectId,
	lore_item_id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Image", ImageSchema);
