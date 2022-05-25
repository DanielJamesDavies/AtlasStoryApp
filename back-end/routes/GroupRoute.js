const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");

const GetGroup = require("../services/Group/GetGroup");
const GetGroupByID = require("../services/Group/GetGroupByID");
const CreateGroup = require("../services/Group/CreateGroup");

router.get("/", CookieConsentAuthentication, Authenticate, GetGroup);
router.get("/:id", CookieConsentAuthentication, Authenticate, GetGroupByID);
router.post("/", CookieConsentAuthentication, Authenticate, CreateGroup);

module.exports = router;
