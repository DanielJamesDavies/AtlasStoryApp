const Location = require("../../models/Location");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldLocation = await Location.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldLocation) return res.status(200).send({ errors: [{ message: "Location Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(oldLocation.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const newLocation = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldLocation)), req?.body?.path, req?.body?.newValue);

	try {
		await Location.findOneAndReplace({ _id: req.params.id }, newLocation, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Location Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { location: newLocation } });
};
