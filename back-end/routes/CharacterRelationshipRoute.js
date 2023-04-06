const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetCharacterRelationship = require("../services/CharacterRelationship/GetCharacterRelationship");
const GetCharacterRelationshipValueByID = require("../services/CharacterRelationship/GetCharacterRelationshipValueByID");
const CreateCharacterRelationship = require("../services/CharacterRelationship/CreateCharacterRelationship");
const UpdateCharacterRelationship = require("../services/CharacterRelationship/UpdateCharacterRelationship");
const DeleteCharacterRelationship = require("../services/CharacterRelationship/DeleteCharacterRelationship");

router.get("/", StoryViewAuthentication, GetCharacterRelationship);
router.post("/get-value/:id", StoryViewAuthentication, GetCharacterRelationshipValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, CreateCharacterRelationship);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateCharacterRelationship);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeleteCharacterRelationship);

module.exports = router;
