const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");

const GetUser = require("../services/User/GetUser");
const GetUserByID = require("../services/User/GetUserByID");
const CreateNewUser = require("../services/User/CreateNewUser");
const VerifyUser = require("../services/User/VerifyUser");
const LogInUser = require("../services/User/LogInUser");
const LogOutUser = require("../services/User/LogOutUser");
const UpdateUser = require("../services/User/UpdateUser");
const DeleteUser = require("../services/User/DeleteUser");

router.get("/", GetUser);
router.get("/:id", GetUserByID);
router.post("/", CookieConsentAuthentication, CreateNewUser);
router.post("/verify", VerifyUser);
router.post("/login", CookieConsentAuthentication, LogInUser);
router.post("/logout", CookieConsentAuthentication, LogOutUser);
router.patch("/", CookieConsentAuthentication, Authenticate, UpdateUser);
router.delete("/", Authenticate, DeleteUser);

module.exports = router;
