const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetCharacter = require("../services/Character/GetCharacter");
const GetPrimaryCharacter = require("../services/Character/GetPrimaryCharacter");
const GetCharacterByID = require("../services/Character/GetCharacterByID");
const GetCharacterValueByID = require("../services/Character/GetCharacterValueByID");
const CreateCharacter = require("../services/Character/CreateCharacter");
const UpdateCharacter = require("../services/Character/UpdateCharacter");
const DeleteCharacter = require("../services/Character/DeleteCharacter");
const GetStoryCharacterCards = require("../services/Character/GetStoryCharacterCards");

router.get("/", StoryViewAuthentication, GetCharacter);
router.get("/cards", StoryViewAuthentication, GetStoryCharacterCards);
router.get("/primary-character", StoryViewAuthentication, GetPrimaryCharacter);
router.get("/:id", StoryViewAuthentication, GetCharacterByID);
router.post("/get-value/:id", StoryViewAuthentication, GetCharacterValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, CreateCharacter);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateCharacter);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeleteCharacter);

module.exports = router;
