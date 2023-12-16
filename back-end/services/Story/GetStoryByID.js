const jwt_decode = require("jwt-decode");
const Story = require("../../models/Story");
const User = require("../../models/User");

const Image = require("../../models/Image");
const Group = require("../../models/Group");
const CharacterType = require("../../models/CharacterType");
const Character = require("../../models/Character");
const CharacterRelationship = require("../../models/CharacterRelationship");
const Substory = require("../../models/Substory");
const Location = require("../../models/Location");
const Event = require("../../models/Event");
const LoreItem = require("../../models/LoreItem");
const Object = require("../../models/Object");

module.exports = async (req, res) => {
	const story = await Story.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
	let newStory = JSON.parse(JSON.stringify(story));

	if (!story?.owner) return res.status(200).send({ errors: [{ message: "Owner Not Found" }] });

	const owner = await User.findById(story.owner)
		.exec()
		.catch(() => false);
	if (!owner) return res.status(200).send({ errors: [{ message: "Owner Not Found" }] });
	newStory.data.owner = { _id: owner._id, username: owner.username, nickname: owner?.data?.nickname };

	if (!req?.query?.all)
		res.status(200).send({
			message: "Success",
			data: { story: newStory, isAuthorizedToEdit: getIsAuthorizedToModify(req?.cookies?.AtlasStoryAppToken, newStory) },
		});

	// Get All Story Data

	let response = { story };

	// Get All Images
	const images = await Image.find({ story_id: story?._id })
		.exec()
		.catch(() => undefined);
	response.images = images;

	// Get All Groups
	const groups = await Group.find({ story_id: story?._id })
		.exec()
		.catch(() => undefined);
	response.groups = groups;

	// Get All Character Types
	const character_types = await CharacterType.find({ story_id: story?._id })
		.exec()
		.catch(() => undefined);
	response.character_types = character_types;

	// Get All Characters
	const characters = await Character.find({ story_id: story?._id })
		.exec()
		.catch(() => undefined);
	response.characters = characters;

	// Get All Character Relationships
	const character_relationships = await CharacterRelationship.find({ story_id: story?._id })
		.exec()
		.catch(() => undefined);
	response.character_relationships = character_relationships;

	// Get All Plots
	const plots = await Substory.find({ story_id: story?._id })
		.exec()
		.catch(() => undefined);
	response.plots = plots;

	// Get All Locations
	const locations = await Location.find({ story_id: story?._id })
		.exec()
		.catch(() => undefined);
	response.locations = locations;

	// Get All Events
	const events = await Event.find({ story_id: story?._id })
		.exec()
		.catch(() => undefined);
	response.events = events;

	// Get All World Items
	const world_items = await LoreItem.find({ story_id: story?._id })
		.exec()
		.catch(() => undefined);
	response.world_items = world_items;

	// Get All Objects
	const objects = await Object.find({ story_id: story?._id })
		.exec()
		.catch(() => undefined);
	response.objects = objects;

	return res.status(200).send({ message: "Success", data: response });
};

function getIsAuthorizedToModify(AtlasStoryAppToken, story) {
	let user_id = false;
	try {
		user_id = jwt_decode(AtlasStoryAppToken)?.user_id;
	} catch (error) {}

	if (!user_id) return false;

	if (story?.owner && JSON.stringify(user_id) === JSON.stringify(story?.owner)) return true;

	if (!story?.data?.members) return false;

	const collaboratorIDs = story.data.members
		.map((member) => {
			if (!member?.user_id || member?.type !== "collaborator") return false;
			return member;
		})
		.filter((e) => e !== false);

	if (collaboratorIDs.includes(user_id)) return true;

	return false;
}
