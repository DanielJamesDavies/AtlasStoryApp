const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryAuthentication = require("../services/StoryAuthentication");

const GetCharacterType = require("../services/CharacterType/GetCharacterType");
const GetCharacterTypeByID = require("../services/CharacterType/GetCharacterTypeByID");
const GetCharacterTypeValueByID = require("../services/CharacterType/GetCharacterTypeValueByID");
const CreateCharacterType = require("../services/CharacterType/CreateCharacterType");
const UpdateCharacterType = require("../services/CharacterType/UpdateCharacterType");
const DeleteCharacterType = require("../services/CharacterType/DeleteCharacterType");

router.get("/", GetCharacterType);
router.get("/:id", GetCharacterTypeByID);
router.post("/get-value/:id", GetCharacterTypeValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryAuthentication, CreateCharacterType);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, UpdateCharacterType);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, DeleteCharacterType);

module.exports = router;
