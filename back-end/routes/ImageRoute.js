const express = require("express");
const router = express.Router();
const { fork } = require("child_process");

const GetImageByID = require("../services/Image/GetImageByID");
const CreateImage = require("../services/Image/CreateImage");
const UpdateImage = require("../services/Image/UpdateImage");

const getImageChild = fork(__dirname + "/../services/Image/GetImageChild.js");

router.get(
	"/:id",
	(req, res, next) => {
		req.getImageChild = getImageChild;
		next();
	},
	GetImageByID
);
router.post("/", CreateImage);
router.patch("/:id", UpdateImage);

module.exports = router;
