const Image = require("../../models/Image");

module.exports = async (key, id) => {
	if (!key || !id) return { errors: [{ message: "Invalid Arguments Given" }] };

	let condition = {};
	condition[key] = id;

	try {
		await Image.deleteMany(condition);
	} catch (error) {
		return { errors: [{ message: "Images Could Not Be Deleted" }] };
	}

	return { message: "Success" };
};
