const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetEvent = require("../services/Event/GetEvent");
const GetEventByID = require("../services/Event/GetEventByID");
const GetEventValueByID = require("../services/Event/GetEventValueByID");
const CreateEvent = require("../services/Event/CreateEvent");
const UpdateEvent = require("../services/Event/UpdateEvent");
const DeleteEvent = require("../services/Event/DeleteEvent");

router.get("/", StoryViewAuthentication, GetEvent);
router.get("/:id", StoryViewAuthentication, GetEventByID);
router.post("/get-value/:id", StoryViewAuthentication, GetEventValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, CreateEvent);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateEvent);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeleteEvent);

module.exports = router;
