const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const GenreAuthentication = require("../services/Genre/GenreAuthentication");

const GetGenre = require("../services/Genre/GetGenre");
const GetGenreByID = require("../services/Genre/GetGenreByID");
const CreateGenre = require("../services/Genre/CreateGenre");
const UpdateGenre = require("../services/Genre/UpdateGenre");
const FavouriteGenre = require("../services/Genre/FavouriteGenre");
const UnfavouriteGenre = require("../services/Genre/UnfavouriteGenre");
const DeleteGenre = require("../services/Genre/DeleteGenre");

router.get("/", GetGenre);
router.get("/:id", GetGenreByID);
router.post("/", CookieConsentAuthentication, Authenticate, CreateGenre);
router.post("/favourite/:id", CookieConsentAuthentication, Authenticate, FavouriteGenre);
router.post("/unfavourite/:id", CookieConsentAuthentication, Authenticate, UnfavouriteGenre);
router.patch("/:id", CookieConsentAuthentication, Authenticate, GenreAuthentication, UpdateGenre);
router.delete("/:id", CookieConsentAuthentication, Authenticate, GenreAuthentication, DeleteGenre);

module.exports = router;
