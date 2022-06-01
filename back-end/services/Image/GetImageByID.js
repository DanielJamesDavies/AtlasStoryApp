const Image = require("../../models/Image");

module.exports = async (req, res) => {
	const image = await Image.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Image Not Found" }] });
		});
	res.status(200).send({ message: "Success", data: image });
};
