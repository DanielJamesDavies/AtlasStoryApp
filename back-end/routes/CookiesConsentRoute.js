const express = require("express");
const router = express.Router();

const GetCookiesConsent = require("../services/CookiesConsent/GetCookiesConsent");
const ChangeCookiesConsent = require("../services/CookiesConsent/ChangeCookiesConsent");

router.get("/", GetCookiesConsent);
router.post("/", ChangeCookiesConsent);

module.exports = router;
