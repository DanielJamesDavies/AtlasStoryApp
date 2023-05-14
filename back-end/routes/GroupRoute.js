const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetGroup = require("../services/Group/GetGroup");
const GetGroupByID = require("../services/Group/GetGroupByID");
const GetGroupValueByID = require("../services/Group/GetGroupValueByID");
const CreateGroup = require("../services/Group/CreateGroup");
const UpdateGroup = require("../services/Group/UpdateGroup");
const DeleteGroup = require("../services/Group/DeleteGroup");

router.get("/", StoryViewAuthentication, GetGroup);
router.get("/:id", StoryViewAuthentication, GetGroupByID);
router.post("/get-value/:id", StoryViewAuthentication, GetGroupValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, CreateGroup);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateGroup);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeleteGroup);

module.exports = router;
