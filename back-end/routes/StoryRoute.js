const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const GetStory = require("../services/Story/GetStory");
const GetStoryByID = require("../services/Story/GetStoryByID");

router.get("/", Authenticate, GetStory);
router.get("/:id", Authenticate, GetStoryByID);

module.exports = router;
