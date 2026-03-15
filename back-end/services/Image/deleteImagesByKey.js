const Image = require("../../models/Image");

const { deleteFile } = require("../R2Config");

module.exports = async (key, id) => {
	if (!key || !id) return { errors: [{ message: "Invalid Arguments Given" }] };

	let condition = {};
	condition[key] = id;

	try {
		const images = await Image.find(condition);

		await Promise.all(
			images.map(async (image) => {
				await deleteFile(`images/${image?._id}.webp`).catch((e) => {
					console.log("Error deleting image from R2: ", e);
				});
			})
		);
	} catch (error) {
		return { errors: [{ message: "Images Could Not Be Deleted" }] };
	}

	try {
		await Image.deleteMany(condition);
	} catch (error) {
		return { errors: [{ message: "Images Could Not Be Deleted" }] };
	}

	return { message: "Success" };
};
