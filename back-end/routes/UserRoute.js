const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const GetUser = require("../services/User/GetUser");
const GetUserByID = require("../services/User/GetUserByID");
const CreateNewUser = require("../services/User/CreateNewUser");
const LogInUser = require("../services/User/LogInUser");
const LogOutUser = require("../services/User/LogOutUser");

router.get("/", CookieConsentAuthentication, Authenticate, GetUser);
router.get("/:id", CookieConsentAuthentication, Authenticate, GetUserByID);
router.post("/", CookieConsentAuthentication, CreateNewUser);
router.post("/login", CookieConsentAuthentication, LogInUser);
router.post("/logout", CookieConsentAuthentication, LogOutUser);

module.exports = router;
