const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetStory = require("../services/Story/GetStory");
const GetRecommendedStories = require("../services/Story/GetRecommendedStories");
const GetStoryByID = require("../services/Story/GetStoryByID");
const GetStoryValueByID = require("../services/Story/GetStoryValueByID");
const LeaveStory = require("../services/Story/LeaveStory");
const CreateStory = require("../services/Story/CreateStory");
const UpdateStory = require("../services/Story/UpdateStory");
const DeleteStory = require("../services/Story/DeleteStory");

router.get("/", GetStory);
router.get("/recommended", GetRecommendedStories);
router.get("/:id", StoryViewAuthentication, GetStoryByID);
router.post("/get-value/:id", StoryViewAuthentication, GetStoryValueByID);
router.post("/leave/:id", StoryViewAuthentication, LeaveStory);
router.post("/", CookieConsentAuthentication, Authenticate, CreateStory);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateStory);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeleteStory);

module.exports = router;
