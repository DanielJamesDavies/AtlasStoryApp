const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetObject = require("../services/Object/GetObject");
const GetObjectByID = require("../services/Object/GetObjectByID");
const GetObjectValueByID = require("../services/Object/GetObjectValueByID");
const CreateObject = require("../services/Object/CreateObject");
const UpdateObject = require("../services/Object/UpdateObject");
const DeleteObject = require("../services/Object/DeleteObject");

router.get("/", StoryViewAuthentication, GetObject);
router.get("/:id", StoryViewAuthentication, GetObjectByID);
router.post("/get-value/:id", StoryViewAuthentication, GetObjectValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, CreateObject);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateObject);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeleteObject);

module.exports = router;
