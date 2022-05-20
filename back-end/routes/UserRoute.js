const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get User
router.get("/:id/", async (req, res) => {
	const user = await User.findById(req.params.id)
		.exec()
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: "Error: " + err });
		});
	res.status(200).send(user);
});

module.exports = router;
