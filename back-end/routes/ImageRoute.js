const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");

const GetImageByID = require("../services/Image/GetImageByID");
const CreateImage = require("../services/Image/CreateImage");
const UpdateImage = require("../services/Image/UpdateImage");

router.get("/:id", GetImageByID);
router.post("/", CookieConsentAuthentication, Authenticate, CreateImage);
router.patch("/:id", CookieConsentAuthentication, Authenticate, UpdateImage);

module.exports = router;
