const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const GetImageByID = require("../services/Image/GetImageByID");

router.get("/:id", Authenticate, GetImageByID);

module.exports = router;
