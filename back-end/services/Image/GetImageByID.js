const Image = require("../../models/Image");

module.exports = async (req, res) => {
	const image = await Image.findById(req.params.id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	res.status(200).send({ message: "Success", data: image });
};
