const Image = require("../../models/Image");

module.exports = async (req, res) => {
	if (!req?.params?.id) return res.status(200).send({ errors: [{ message: "Image Not Found" }] });
	if (!req?.body?.newValue) return res.status(200).send({ errors: [{ message: "New Value Not Given" }] });
	if (typeof req?.body?.newValue !== "string") return res.status(200).send({ errors: [{ message: "Invalid New Value" }] });

	const oldImage = await Image.findById(req.params.id)
		.exec()
		.catch(() => {
			return res.status(200).send({ errors: [{ message: "Image Not Found" }] });
		});

	let newImage = JSON.parse(JSON.stringify(oldImage));
	newImage.image = req.body.newValue;

	try {
		await Image.findOneAndReplace({ _id: req.params.id }, newImage, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Image Could Not Be Saved" }] });
	}

	res.status(200).send({ message: "Success", data: { image: newImage } });
};
