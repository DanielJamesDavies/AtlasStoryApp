const Image = require("../../models/Image");
const sharp = require("sharp");

const { uploadBase64, getImageAsBase64 } = require("../R2Config");

module.exports = async (req, res) => {
	const path = `images/${req?.params?.id}.webp`;

	try {
		const image_base64 = await getImageAsBase64(path);
		return res.status(200).send({ message: "Success", data: { image: { _id: req?.params?.id, image: image_base64 } } });
	} catch (e) {
		if (e.code === "R2_LIMIT") return res.status(200).send({ errors: [{ message: e.message }] });
		if (e.$metadata?.httpStatusCode !== 404 && e.name !== "NoSuchKey") console.log("Unexpected R2 error in GetImageByID:", e.message);
	}

	// R2 miss — fall back to MongoDB legacy path
	const image = await Image.findById(req?.params?.id)
		.exec()
		.catch(() => false);
	if (!image) return res.status(200).send({ errors: [{ message: "Image Not Found" }] });

	if (image?.image !== undefined && image?.image !== "NO_IMAGE" && image?.image?.split("<svg").length <= 1) {
		if (image?.image?.split(",")[0].split("/")[1].split(";")[0].trim() === "png") {
			console.log("PNG Image Not On R2 Storage: ", req?.params?.id, image?.image?.split(",")[0]);

			try {
				const webp_base64 = await new Promise((resolve) => {
					sharp(Buffer.from(image?.image.split(",")[1], "base64"))
						.webp()
						.toBuffer()
						.then((output_buffer) => {
							resolve(output_buffer.toString("base64"));
						})
						.catch((e) => {
							console.error("Error:", e);
							resolve(false);
						});
				});

				uploadBase64(path, webp_base64);
			} catch (e) {
				console.log(image?.image);
				console.log("ERROR:", e);
			}
		} else {
			console.log("Image Not On R2 Storage: ", req?.params?.id, image?.image?.split(",")[0]);

			try {
				uploadBase64(path, image?.image.substring(23));
			} catch (e) {
				console.log(image?.image);
				console.log("ERROR:", e);
			}
		}
	}

	return res.status(200).send({ message: "Success", data: { image } });
};
