const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");

const GetImageByID = require("../services/Image/GetImageByID");

router.get("/:id", GetImageByID);

module.exports = router;
