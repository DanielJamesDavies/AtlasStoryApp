const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");

const GetUserBlockedUsers = require("../services/UserBlock/GetUserBlockedUsers");
const GetUserBlockedStatus = require("../services/UserBlock/GetUserBlockedStatus");
const BlockUser = require("../services/UserBlock/BlockUser");
const UnblockUser = require("../services/UserBlock/UnblockUser");

router.get("/", GetUserBlockedUsers);
router.get("/status", GetUserBlockedStatus);
router.post("/:id", Authenticate, CookieConsentAuthentication, BlockUser);
router.delete("/:id", Authenticate, CookieConsentAuthentication, UnblockUser);

module.exports = router;
