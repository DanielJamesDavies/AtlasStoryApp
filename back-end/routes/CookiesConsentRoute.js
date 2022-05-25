const express = require("express");
const router = express.Router();

const ChangeCookiesConsent = require("../services/CookiesConsent/ChangeCookiesConsent");

router.post("/", ChangeCookiesConsent);

module.exports = router;
