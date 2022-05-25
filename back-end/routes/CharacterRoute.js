const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");

const GetCharacter = require("../services/Character/GetCharacter");
const GetPrimaryCharacter = require("../services/Character/GetPrimaryCharacter");
const GetCharacterByID = require("../services/Character/GetCharacterByID");
const CreateCharacter = require("../services/Character/CreateCharacter");

router.get("/", CookieConsentAuthentication, Authenticate, GetCharacter);
router.get("/primary-character", CookieConsentAuthentication, Authenticate, GetPrimaryCharacter);
router.get("/:id", CookieConsentAuthentication, Authenticate, GetCharacterByID);
router.post("/", CookieConsentAuthentication, Authenticate, CreateCharacter);

module.exports = router;
