const CharacterType = require("../../models/CharacterType");

const GetValueInNestedObject = require("../GetValueInNestedObject");
const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");
const addToStoryChangeLog = require("../Story/AddToStoryChangeLog");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldCharacterType = await CharacterType.findById(req.params.id)
		.exec()
		.catch(() => {
			return res.status(200).send({ errors: [{ message: "Character Type Not Found" }] });
		});
	if (!oldCharacterType) return res.status(200).send({ errors: [{ message: "Character Type Not Found" }] });
	const oldValue = GetValueInNestedObject(oldCharacterType, req.body.path);

	const newCharacterType = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldCharacterType)), req?.body?.path, req?.body?.newValue);

	try {
		await CharacterType.findOneAndReplace({ _id: req.params.id }, newCharacterType, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Type Could Not Be Saved" }] });
	}

	if (JSON.stringify(oldValue) !== JSON.stringify(req?.body?.newValue))
		addToStoryChangeLog(
			req,
			req.body.story_id,
			generateChangeLogItem({
				content_id: req.params.id,
				path: req.body.path,
			})
		);

	return res.status(200).send({ message: "Success", data: { characterType: newCharacterType } });
};

function generateChangeLogItem({ content_id, path }) {
	let newPath = JSON.parse(JSON.stringify(path));
	const newChangeLogItem = { content_type: "character_type", content_id, title: "", path };

	const pathTitlePairs = [
		{ path: ["data", "name"], title: "Name" },
		{ path: ["data", "colour"], title: "Colour" },
		{ path: ["data", "description"], title: "Description" },
	];

	const pathTitlePair = pathTitlePairs.find((e) => JSON.stringify(e.path) === JSON.stringify(newPath));
	newChangeLogItem.title += pathTitlePair ? pathTitlePair?.title : "";

	return newChangeLogItem;
}
