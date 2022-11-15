const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const GenreAuthentication = require("../services/Genre/GenreAuthentication");

const GetGenre = require("../services/Genre/GetGenre");
const GetGenreByID = require("../services/Genre/GetGenreByID");
const CreateGenre = require("../services/Genre/CreateGenre");
const UpdateGenre = require("../services/Genre/UpdateGenre");
const DeleteGenre = require("../services/Genre/DeleteGenre");

router.get("/", GetGenre);
router.get("/:id", GetGenreByID);
router.post("/", CookieConsentAuthentication, Authenticate, CreateGenre);
router.patch("/:id", CookieConsentAuthentication, Authenticate, GenreAuthentication, UpdateGenre);
router.delete("/:id", CookieConsentAuthentication, Authenticate, GenreAuthentication, DeleteGenre);

module.exports = router;
