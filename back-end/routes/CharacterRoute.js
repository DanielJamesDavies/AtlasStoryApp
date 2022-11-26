const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryMemberAuthentication = require("../services/StoryMemberAuthentication");
const StoryAuthentication = require("../services/StoryAuthentication");

const GetCharacter = require("../services/Character/GetCharacter");
const GetPrimaryCharacter = require("../services/Character/GetPrimaryCharacter");
const GetCharacterByID = require("../services/Character/GetCharacterByID");
const GetCharacterValueByID = require("../services/Character/GetCharacterValueByID");
const CreateCharacter = require("../services/Character/CreateCharacter");
const UpdateCharacter = require("../services/Character/UpdateCharacter");
const DeleteCharacter = require("../services/Character/DeleteCharacter");

router.get("/", StoryMemberAuthentication, GetCharacter);
router.get("/primary-character", StoryMemberAuthentication, GetPrimaryCharacter);
router.get("/:id", StoryMemberAuthentication, GetCharacterByID);
router.post("/get-value/:id", StoryMemberAuthentication, GetCharacterValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryAuthentication, CreateCharacter);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, UpdateCharacter);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, DeleteCharacter);

module.exports = router;
