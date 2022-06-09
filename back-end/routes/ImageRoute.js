const express = require("express");
const router = express.Router();

const GetImageByID = require("../services/Image/GetImageByID");
const CreateImage = require("../services/Image/CreateImage");
const UpdateImage = require("../services/Image/UpdateImage");

router.get("/:id", GetImageByID);
router.post("/", CreateImage);
router.patch("/:id", UpdateImage);

module.exports = router;
