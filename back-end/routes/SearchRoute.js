const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");

const GetSearchResults = require("../services/Search/GetSearchResults");

router.get("/", CookieConsentAuthentication, Authenticate, GetSearchResults);

module.exports = router;
