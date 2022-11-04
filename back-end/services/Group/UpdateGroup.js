const Group = require("../../models/Group");

const GetValueInNestedObject = require("../GetValueInNestedObject");
const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");
const addToStoryChangeLog = require("../Story/AddToStoryChangeLog");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldGroup = await Group.findById(req.params.id)
		.exec()
		.catch(() => {
			return res.status(200).send({ errors: [{ message: "Group Not Found" }] });
		});
	if (!oldGroup) return res.status(200).send({ errors: [{ message: "Group Not Found" }] });
	const oldValue = GetValueInNestedObject(oldGroup, req.body.path);

	const newGroup = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldGroup)), req?.body?.path, req?.body?.newValue);

	try {
		await Group.findOneAndReplace({ _id: req.params.id }, newGroup, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Group Could Not Be Saved" }] });
	}

	if (JSON.stringify(oldValue) !== JSON.stringify(req?.body?.newValue))
		addToStoryChangeLog(
			req.body.story_id,
			generateChangeLogItem({
				content_id: req.params.id,
				path: req.body.path,
			})
		);

	return res.status(200).send({ message: "Success", data: { group: newGroup } });
};

function generateChangeLogItem({ content_id, path }) {
	let newPath = JSON.parse(JSON.stringify(path));
	const newChangeLogItem = { content_type: "group", content_id, title: "", path };

	const pathTitlePairs = [
		{ path: ["data", "name"], title: "Name" },
		{ path: ["data", "characters"], title: "Characters" },
	];

	const pathTitlePair = pathTitlePairs.find((e) => JSON.stringify(e.path) === JSON.stringify(newPath));
	newChangeLogItem.title += pathTitlePair ? pathTitlePair?.title : "";

	return newChangeLogItem;
}
