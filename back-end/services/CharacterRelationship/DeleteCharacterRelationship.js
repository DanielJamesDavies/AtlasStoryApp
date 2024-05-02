const CharacterRelationship = require("../../models/CharacterRelationship");

module.exports = async (req, res) => {
	const characterRelationship = await CharacterRelationship.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!characterRelationship) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

	// Story Authentication Check
	if (
		JSON.stringify(characterRelationship.story_id) !== JSON.stringify(req.body.story_id) &&
		JSON.stringify(characterRelationship.story_id) !== JSON.stringify(req.query.story_id)
	)
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	try {
		const characterRelationshipDeleteResult = await CharacterRelationship.deleteOne({ _id: req.params.id });
		if (characterRelationshipDeleteResult?.deletedCount !== 1)
			return res.status(200).send({ errors: [{ message: "Character Relationship Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Relationship Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};
