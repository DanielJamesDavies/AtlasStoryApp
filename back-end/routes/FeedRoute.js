const express = require("express");
const router = express.Router();

const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const Authenticate = require("../services/TokenAuthentication");

const GetFeed = require("../services/Feed/GetFeed");

router.get("/", CookieConsentAuthentication, Authenticate, GetFeed);

module.exports = router;
