const express = require("express");
const router = express.Router();

const GetImageByID = require("../services/Image/GetImageByID");

router.get("/:id", GetImageByID);

module.exports = router;
