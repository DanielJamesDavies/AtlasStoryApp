const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");

const GetStoryFollowers = require("../services/StoryFollow/GetStoryFollowers");
const GetUserFollowing = require("../services/StoryFollow/GetUserFollowing");
const FollowStory = require("../services/StoryFollow/FollowStory");
const UnfollowStory = require("../services/StoryFollow/UnfollowStory");

router.get("/story-followers/:id", StoryViewAuthentication, GetStoryFollowers);
router.get("/user-following/:id", GetUserFollowing);
router.post("/:id", Authenticate, CookieConsentAuthentication, FollowStory);
router.delete("/:id", Authenticate, CookieConsentAuthentication, UnfollowStory);

module.exports = router;
