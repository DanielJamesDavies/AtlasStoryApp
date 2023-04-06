const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetSubstory = require("../services/Substory/GetSubstory");
const GetSubstoryByID = require("../services/Substory/GetSubstoryByID");
const GetSubstoryValueByID = require("../services/Substory/GetSubstoryValueByID");
const CreateSubstory = require("../services/Substory/CreateSubstory");
const UpdateSubstory = require("../services/Substory/UpdateSubstory");
const DeleteSubstory = require("../services/Substory/DeleteSubstory");

router.get("/", StoryViewAuthentication, GetSubstory);
router.get("/:id", StoryViewAuthentication, GetSubstoryByID);
router.post("/get-value/:id", StoryViewAuthentication, GetSubstoryValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, CreateSubstory);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateSubstory);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeleteSubstory);

module.exports = router;
