const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const StoryViewAuthentication = require("../services/StoryViewAuthentication");
const StoryEditAuthentication = require("../services/StoryEditAuthentication");

const GetPlot = require("../services/Plot/GetPlot");
const GetPlotByID = require("../services/Plot/GetPlotByID");
const GetPlotValueByID = require("../services/Plot/GetPlotValueByID");
const CreatePlot = require("../services/Plot/CreatePlot");
const UpdatePlot = require("../services/Plot/UpdatePlot");
const DeletePlot = require("../services/Plot/DeletePlot");

router.get("/", StoryViewAuthentication, GetPlot);
router.get("/:id", StoryViewAuthentication, GetPlotByID);
router.post("/get-value/:id", StoryViewAuthentication, GetPlotValueByID);
router.post("/", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, CreatePlot);
router.patch("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, UpdatePlot);
router.delete("/:id", CookieConsentAuthentication, Authenticate, StoryEditAuthentication, DeletePlot);

module.exports = router;
