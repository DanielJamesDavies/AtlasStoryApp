const Character = require("../../models/Character");
const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldCharacter = await Character.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Character Not Found" }] });
		});
	if (!oldCharacter) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

	let newCharacter = JSON.parse(JSON.stringify(oldCharacter));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["url"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "url", message: "Invalid Arguments Given" }] });

			const newURL = req.body.newValue.split(" ").join("-");

			if (newURL.length < 1)
				return res.status(200).send({ errors: [{ attribute: "url", message: "This URL is too short. Please enter a different URL." }] });

			const urlUsed = await Character.findOne({ url: newURL, story_id: req.body.story_id }).exec();
			if (urlUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "url", message: "This URL is being used by another character. Please enter a different URL" }] });

			newCharacter.url = newURL;
		default:
			newCharacter = ChangeValueInNestedObject(newCharacter, req?.body?.path, req?.body?.newValue);
			break;
	}

	try {
		await Character.findOneAndReplace({ _id: req.params.id }, newCharacter, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { character: newCharacter } });
};
