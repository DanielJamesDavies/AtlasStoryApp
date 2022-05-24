const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const GetStory = require("../services/Story/GetStory");
const GetStoryByID = require("../services/Story/GetStoryByID");
const CreateStory = require("../services/Story/CreateStory");
const DeleteStory = require("../services/Story/DeleteStory");

router.get("/", Authenticate, GetStory);
router.get("/:id", Authenticate, GetStoryByID);
router.post("/", Authenticate, CreateStory);
router.delete("/:id", Authenticate, DeleteStory);

module.exports = router;
