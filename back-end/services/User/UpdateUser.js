const jwt_decode = require("jwt-decode");

const User = require("../../models/User");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const oldUser = await User.findById(user_id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "User Not Found" }] });
		});
	if (!oldUser) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	const newUser = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldUser)), req?.body?.path, req?.body?.newValue);

	try {
		await User.findOneAndUpdate({ _id: user_id }, newUser, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "User Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { user: newUser } });
};
