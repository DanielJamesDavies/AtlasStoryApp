const express = require("express");
const router = express.Router();

// Get User
router.get("/:id/", async (req, res) => {
	res.status(200).send("Success: " + req.params.id);
});

module.exports = router;
