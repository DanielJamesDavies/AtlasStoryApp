const Location = require("../../models/Location");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const location = await Location.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!location) return res.status(200).send({ errors: [{ message: "Location Not Found" }] });

	let newPath = JSON.parse(JSON.stringify(req?.body?.path));

	if (newPath.length > 3 && newPath[0] === "data" && newPath[1] === "mapVersions") {
		const mapVersionIndex = location?.data?.mapVersions?.findIndex((e) => JSON.stringify(e?._id) === JSON.stringify(newPath[2]));
		if (mapVersionIndex === -1) return res.status(200).send({ errors: [{ message: "Location Map Version Not Found" }] });
		newPath[2] = mapVersionIndex;
	}

	if (!newPath) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });
	const value = GetValueInNestedObject(JSON.parse(JSON.stringify(location)), newPath);

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
