const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryMemberAuthentication = require("../services/StoryMemberAuthentication");
const StoryAuthentication = require("../services/StoryAuthentication");

const GetGroup = require("../services/Group/GetGroup");
const GetGroupByID = require("../services/Group/GetGroupByID");
const CreateGroup = require("../services/Group/CreateGroup");
const UpdateGroup = require("../services/Group/UpdateGroup");

router.get("/", StoryMemberAuthentication, GetGroup);
router.get("/:id", StoryMemberAuthentication, GetGroupByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryAuthentication, CreateGroup);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, UpdateGroup);

module.exports = router;
