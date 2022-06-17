const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
	return res.status(200).send({ data: { _id: new mongoose.Types.ObjectId() } });
};
