const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryMemberAuthentication = require("../services/StoryMemberAuthentication");
const StoryAuthentication = require("../services/StoryAuthentication");

const GetCharacterRelationship = require("../services/CharacterRelationship/GetCharacterRelationship");
const CreateCharacterRelationship = require("../services/CharacterRelationship/CreateCharacterRelationship");
const UpdateCharacterRelationship = require("../services/CharacterRelationship/UpdateCharacterRelationship");
const DeleteCharacterRelationship = require("../services/CharacterRelationship/DeleteCharacterRelationship");

router.get("/", StoryMemberAuthentication, GetCharacterRelationship);
router.post("/", CookieConsentAuthentication, Authenticate, StoryAuthentication, CreateCharacterRelationship);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, UpdateCharacterRelationship);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, DeleteCharacterRelationship);

module.exports = router;
