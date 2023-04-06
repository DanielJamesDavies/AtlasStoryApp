const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetCharacterType = require("../services/CharacterType/GetCharacterType");
const GetCharacterTypeByID = require("../services/CharacterType/GetCharacterTypeByID");
const GetCharacterTypeValueByID = require("../services/CharacterType/GetCharacterTypeValueByID");
const CreateCharacterType = require("../services/CharacterType/CreateCharacterType");
const UpdateCharacterType = require("../services/CharacterType/UpdateCharacterType");
const DeleteCharacterType = require("../services/CharacterType/DeleteCharacterType");

router.get("/", StoryViewAuthentication, GetCharacterType);
router.get("/:id", StoryViewAuthentication, GetCharacterTypeByID);
router.post("/get-value/:id", StoryViewAuthentication, GetCharacterTypeValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, CreateCharacterType);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateCharacterType);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeleteCharacterType);

module.exports = router;
