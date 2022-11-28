const CharacterRelationship = require("../../models/CharacterRelationship");

module.exports = async (req, res) => {
	try {
		const characterRelationshipDeleteResult = await CharacterRelationship.deleteOne({ _id: req.params.id });
		if (characterRelationshipDeleteResult?.deletedCount !== 1)
			return res.status(200).send({ errors: [{ message: "Character Relationship Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Relationship Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};
