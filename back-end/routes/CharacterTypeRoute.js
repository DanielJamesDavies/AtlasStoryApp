const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryAuthentication = require("../services/StoryAuthentication");

const GetCharacterType = require("../services/CharacterType/GetCharacterType");
const GetCharacterTypeByID = require("../services/CharacterType/GetCharacterTypeByID");
const CreateCharacterType = require("../services/CharacterType/CreateCharacterType");
const UpdateCharacterType = require("../services/CharacterType/UpdateCharacterType");

router.get("/", GetCharacterType);
router.get("/:id", GetCharacterTypeByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryAuthentication, CreateCharacterType);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, UpdateCharacterType);

module.exports = router;
