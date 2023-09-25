const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetLoreItem = require("../services/Lore/GetLoreItem");
const GetLoreItemByID = require("../services/Lore/GetLoreItemByID");
const GetLoreItemValueByID = require("../services/Lore/GetLoreItemValueByID");
const CreateLoreItem = require("../services/Lore/CreateLoreItem");
const UpdateLoreItem = require("../services/Lore/UpdateLoreItem");
const DeleteLoreItem = require("../services/Lore/DeleteLoreItem");

router.get("/", StoryViewAuthentication, GetLoreItem);
router.get("/:id", StoryViewAuthentication, GetLoreItemByID);
router.post("/get-value/:id", StoryViewAuthentication, GetLoreItemValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, CreateLoreItem);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdateLoreItem);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeleteLoreItem);

module.exports = router;
