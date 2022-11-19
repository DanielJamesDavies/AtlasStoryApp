module.exports = async (req, res) => {
	req.getImageChild.send(req?.params?.id);
	req.getImageChild.on("message", (image) => {
		if (res?.headersSent || JSON.stringify(image._id) !== JSON.stringify(req?.params?.id)) return false;
		if (!image) return res.status(200).send({ errors: [{ message: "Image Not Found" }] });
		res.status(200).send({ message: "Success", data: { image: image } });
	});

	// const image = await Image.findById(req?.params?.id)
	// 	.exec()
	// 	.catch(() => false);
	// if (!image) return res.status(200).send({ errors: [{ message: "Image Not Found" }] });
	// res.status(200).send({ message: "Success", data: { image } });
};
