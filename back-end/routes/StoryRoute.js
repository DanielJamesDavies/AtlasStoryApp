const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");

const GetStory = require("../services/Story/GetStory");
const GetStoryByID = require("../services/Story/GetStoryByID");
const CreateStory = require("../services/Story/CreateStory");
const DeleteStory = require("../services/Story/DeleteStory");

router.get("/", CookieConsentAuthentication, Authenticate, GetStory);
router.get("/:id", CookieConsentAuthentication, Authenticate, GetStoryByID);
router.post("/", CookieConsentAuthentication, Authenticate, CreateStory);
router.delete("/:id", CookieConsentAuthentication, Authenticate, DeleteStory);

module.exports = router;
