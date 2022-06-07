const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryAuthentication = require("../services/StoryAuthentication");

const GetCharacter = require("../services/Character/GetCharacter");
const GetPrimaryCharacter = require("../services/Character/GetPrimaryCharacter");
const GetCharacterByID = require("../services/Character/GetCharacterByID");
const GetCharacterValueByID = require("../services/Character/GetCharacterValueByID");
const CreateCharacter = require("../services/Character/CreateCharacter");
const UpdateCharacter = require("../services/Character/UpdateCharacter");

router.get("/", GetCharacter);
router.get("/primary-character", GetPrimaryCharacter);
router.get("/:id", GetCharacterByID);
router.post("/get-value/:id", GetCharacterValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryAuthentication, CreateCharacter);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, UpdateCharacter);

module.exports = router;
