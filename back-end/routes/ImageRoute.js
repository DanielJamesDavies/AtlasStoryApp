const express = require("express");
const router = express.Router();

const GetImageByID = require("../services/Image/GetImageByID");
const UpdateImage = require("../services/Image/UpdateImage");

router.get("/:id", GetImageByID);
router.patch("/:id", UpdateImage);

module.exports = router;
