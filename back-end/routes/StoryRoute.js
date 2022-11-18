const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryMemberAuthentication = require("../services/StoryMemberAuthentication");
const StoryAuthentication = require("../services/StoryAuthentication");

const GetStory = require("../services/Story/GetStory");
const GetStoryByID = require("../services/Story/GetStoryByID");
const GetStoryValueByID = require("../services/Story/GetStoryValueByID");
const CreateStory = require("../services/Story/CreateStory");
const UpdateStory = require("../services/Story/UpdateStory");
const DeleteStory = require("../services/Story/DeleteStory");

router.get("/", GetStory);
router.get("/:id", StoryMemberAuthentication, GetStoryByID);
router.post("/get-value/:id", StoryMemberAuthentication, GetStoryValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, CreateStory);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryMemberAuthentication, StoryAuthentication, UpdateStory);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryMemberAuthentication, StoryAuthentication, DeleteStory);

module.exports = router;
