const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const IsUserAccessable = require("../services/User/IsUserAccessable");

const GetIsUserFollowing = require("../services/UserFollow/GetIsUserFollowing");
const GetUserFollowing = require("../services/UserFollow/GetUserFollowing");
const GetUserFollowers = require("../services/UserFollow/GetUserFollowers");
const FollowUser = require("../services/UserFollow/FollowUser");
const UnfollowUser = require("../services/UserFollow/UnfollowUser");
const AcceptUserFollow = require("../services/UserFollow/AcceptUserFollow");
const DenyUserFollow = require("../services/UserFollow/DenyUserFollow");

router.get("/", GetIsUserFollowing);
router.get("/following/:id", IsUserAccessable, GetUserFollowing);
router.get("/followers/:id", IsUserAccessable, GetUserFollowers);
router.post("/", Authenticate, CookieConsentAuthentication, FollowUser);
router.post("/:id", Authenticate, CookieConsentAuthentication, FollowUser);
router.delete("/:id", Authenticate, CookieConsentAuthentication, UnfollowUser);
router.patch("/accept/:id", Authenticate, CookieConsentAuthentication, AcceptUserFollow);
router.patch("/deny/:id", Authenticate, CookieConsentAuthentication, DenyUserFollow);

module.exports = router;
