const Image = require("../../models/Image");
// const sharp = require("sharp");

const { storage, ref, uploadString, getDownloadURL } = require("../FirebaseConfig");

module.exports = async (req, res) => {
	const download_url = await new Promise((resolve) => {
		getDownloadURL(ref(storage, `images/${req?.params?.id}.webp`))
			.then(async (url) => {
				return resolve(url?.split("&token=")?.[0]);
			})
			.catch(async () => {
				resolve(false);
			});
	});

	if (download_url === false) {
		// return res.status(200).send({ message: "Success", data: { image: undefined } });

		const image = await Image.findById(req?.params?.id)
			.exec()
			.catch(() => false);
		if (!image) return res.status(200).send({ errors: [{ message: "Image Not Found" }] });

		if (image?.image !== undefined && image?.image !== "NO_IMAGE" && image?.image?.split("<svg").length <= 1) {
			if (image?.image?.split(",")[0].split("/")[1].split(";")[0].trim() === "png") {
				console.log("PNG Image Not On Firebase Storage: ", req?.params?.id, image?.image?.split(",")[0]);

				// const webp_base64 = await new Promise((resolve) => {
				// 	sharp(Buffer.from(image?.image.split(",")[1], "base64"))
				// 		.webp()
				// 		.toBuffer()
				// 		.then((output_buffer) => {
				// 			resolve(output_buffer.toString("base64"));
				// 		})
				// 		.catch((e) => {
				// 			console.error("Error:", e);
				// 			resolve(false);
				// 		});
				// });

				// const storageRef = ref(storage, `images/${req?.params?.id}.webp`);
				// try {
				// 	uploadString(storageRef, webp_base64, "base64");
				// } catch (e) {
				// 	console.log(image?.image);
				// 	console.log(e);
				// }
			} else {
				console.log("Image Not On Firebase Storage: ", req?.params?.id, image?.image?.split(",")[0]);

				const storageRef = ref(storage, `images/${req?.params?.id}.webp`);
				try {
					uploadString(storageRef, image?.image.substring(23), "base64");
				} catch (e) {
					console.log(image?.image);
					console.log("ERROR:", e);
				}
			}
		}

		return res.status(200).send({ message: "Success", data: { image } });
	}

	res.status(200).send({ message: "Success", data: { image: { _id: req?.params?.id, image: download_url }, is_download_url: true } });
};
