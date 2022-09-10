const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryAuthentication = require("../services/StoryAuthentication");

const GetSubstory = require("../services/Substory/GetSubstory");
const GetSubstoryByID = require("../services/Substory/GetSubstoryByID");
const GetSubstoryValueByID = require("../services/Substory/GetSubstoryValueByID");
const CreateSubstory = require("../services/Substory/CreateSubstory");
const UpdateSubstory = require("../services/Substory/UpdateSubstory");
const DeleteSubstory = require("../services/Substory/DeleteSubstory");

router.get("/", GetSubstory);
router.get("/:id", GetSubstoryByID);
router.post("/get-value/:id", GetSubstoryValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryAuthentication, CreateSubstory);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, UpdateSubstory);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryAuthentication, DeleteSubstory);

module.exports = router;
