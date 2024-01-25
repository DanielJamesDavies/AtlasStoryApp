const express = require("express");
const router = express.Router();

const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");

const GetSearchResults = require("../services/Search/GetSearchResults");

router.get("/", CookieConsentAuthentication, GetSearchResults);

module.exports = router;
