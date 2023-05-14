const jwt_decode = require("jwt-decode");

const Story = require("../../models/Story");
const StoryFollow = require("../../models/StoryFollow");
const User = require("../../models/User");
const Character = require("../../models/Character");
const CharacterType = require("../../models/CharacterType");
const Group = require("../../models/Group");
const Location = require("../../models/Location");

const deleteImagesByKey = require("../Image/deleteImagesByKey");

module.exports = async (req, res) => {
	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const story = await Story.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!story || !story._id) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
	if (!story?.owner) return res.status(200).send({ errors: [{ message: "Owner Not Found" }] });
	if (JSON.stringify(user_id) !== JSON.stringify(story.owner)) return res.status(200).send({ errors: [{ message: "Unauthorized Action" }] });

	// Story Authentication Check
	if (JSON.stringify(story._id) !== JSON.stringify(req.body.story_id)) return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	// Remove Story Follows
	const removeStoryFollowsResult = await removeStoryFollows(story._id);
	if (removeStoryFollowsResult?.errors) return res.status(200).send({ errors: removeStoryFollowsResult.errors });

	// Remove Story from Members
	const removeStoryFromMembersResult = await removeStoryFromMembers(story?.data?.members, story._id);
	if (removeStoryFromMembersResult?.errors) return res.status(200).send({ errors: removeStoryFromMembersResult.errors });

	// Delete Images
	const deleteImagesResult = await deleteImagesByKey("story_id", story._id);
	if (deleteImagesResult?.errors) return res.status(200).send({ errors: deleteImagesResult.errors });

	// Delete Characters
	const deleteStoryCharactersResult = await deleteStoryCharacters(story._id);
	if (deleteStoryCharactersResult?.errors) return res.status(200).send({ errors: deleteStoryCharactersResult.errors });

	// Delete Character Types
	const deleteStoryCharacterTypesResult = await deleteStoryCharacterTypes(story._id);
	if (deleteStoryCharacterTypesResult?.errors) return res.status(200).send({ errors: deleteStoryCharacterTypesResult.errors });

	// Delete Groups
	const deleteStoryGroupsResult = await deleteStoryGroups(story._id);
	if (deleteStoryGroupsResult?.errors) return res.status(200).send({ errors: deleteStoryGroupsResult.errors });

	// Delete Locations
	const deleteStoryLocationsResult = await deleteStoryLocations(story._id);
	if (deleteStoryLocationsResult?.errors) return res.status(200).send({ errors: deleteStoryLocationsResult.errors });

	// Delete Story
	try {
		const storyDeleteResult = await Story.deleteOne({ _id: story._id });
		if (storyDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Story Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Deleted" }] });
	}

	// Remove Story from Owner
	const removeStoryFromOwnerResult = await removeStoryFromOwner(story.owner, story._id);
	if (removeStoryFromOwnerResult?.errors) return res.status(200).send({ errors: removeStoryFromOwnerResult.errors });

	return res.status(200).send({ message: "Success" });
};

async function deleteStoryCharacters(story_id) {
	try {
		await Character.deleteMany({ story_id });
	} catch (error) {
		return { errors: [{ message: "Characters Could Not Be Deleted" }] };
	}
	return {};
}

async function deleteStoryCharacterTypes(story_id) {
	try {
		await CharacterType.deleteMany({ story_id });
	} catch (error) {
		return { errors: [{ message: "Character Types Could Not Be Deleted" }] };
	}
	return {};
}

async function deleteStoryGroups(story_id) {
	try {
		await Group.deleteMany({ story_id });
	} catch (error) {
		return { errors: [{ message: "Groups Could Not Be Deleted" }] };
	}
	return {};
}

async function deleteStoryLocations(story_id) {
	try {
		await Location.deleteMany({ story_id });
	} catch (error) {
		return { errors: [{ message: "Locations Could Not Be Deleted" }] };
	}
	return {};
}

async function removeStoryFromMembers(members, story_id) {
	if (!members) return { errors: [{ message: "Members Not Found" }] };
	await Promise.all(
		members.map(async (membersMember) => {
			if (!membersMember?.user_id) return false;
			const member = await User.findById(membersMember.user_id)
				.exec()
				.catch(() => false);
			if (!member || !member?.data?.stories) return false;

			const memberStoryIndex = member.data.stories.findIndex((e) => JSON.stringify(e) === JSON.stringify(story_id));
			if (memberStoryIndex !== -1) {
				member.data.stories.splice(memberStoryIndex, 1);
				try {
					await member.save();
				} catch (error) {
					return false;
				}
			}
			return true;
		})
	);
	return {};
}

async function removeStoryFromOwner(user_id, story_id) {
	const owner = await User.findById(user_id)
		.exec()
		.catch(() => false);
	if (!owner) return { errors: [{ message: "Owner Not Found" }] };

	const ownerStoryIndex = owner.data.stories.findIndex((e) => JSON.stringify(e) === JSON.stringify(story_id));
	if (ownerStoryIndex !== -1) {
		owner.data.stories.splice(ownerStoryIndex, 1);
		try {
			await owner.save();
		} catch (error) {
			return { errors: [{ message: "Owner Could Not Be Saved" }] };
		}
	}

	return {};
}

async function removeStoryFollows(story_id) {
	try {
		await StoryFollow.deleteMany({ story_id });
	} catch (error) {
		return { errors: [{ message: "Story Follow Relationships Could Not Be Deleted" }] };
	}

	return {};
}
