const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");

router.get("/client-id", Authenticate, require("../services/Spotify/GetClientID"));
router.get("/get-tokens", Authenticate, require("../services/Spotify/GetTokens"));
router.get("/get-access-token", Authenticate, require("../services/Spotify/GetAccessToken"));
router.get("/should-connect-device", Authenticate, require("../services/Spotify/GetShouldConnectDevice"));
router.patch("/should-connect-device", Authenticate, require("../services/Spotify/UpdateShouldConnectDevice"));

module.exports = router;
