const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");

const GetIsUserFollowing = require("../services/UserFollow/GetIsUserFollowing");
const FollowUser = require("../services/UserFollow/FollowUser");
const UnfollowUser = require("../services/UserFollow/UnfollowUser");

router.get("/", GetIsUserFollowing);
router.post("/:id", Authenticate, CookieConsentAuthentication, FollowUser);
router.delete("/:id", Authenticate, CookieConsentAuthentication, UnfollowUser);

module.exports = router;
