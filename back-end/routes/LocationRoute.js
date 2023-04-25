const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetLocation = require("../services/Location/GetLocation");
const GetLocationByID = require("../services/Location/GetLocationByID");
const GetLocationValueByID = require("../services/Location/GetLocationValueByID");
const UpdateLocations = require("../services/Location/UpdateLocations");
const UpdateLocation = require("../services/Location/UpdateLocation");
const DeleteLocation = require("../services/Location/DeleteLocation");

router.get("/", StoryViewAuthentication, GetLocation);
router.get("/:id", StoryViewAuthentication, GetLocationByID);
router.post("/get-value/:id", StoryViewAuthentication, GetLocationValueByID);
router.patch("/", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateLocations);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateLocation);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeleteLocation);

module.exports = router;
