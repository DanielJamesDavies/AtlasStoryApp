const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const CookieConsentAuthentication = require("../services/CookiesConsent/CookieConsentAuthentication");
const IsUserAccessable = require("../services/User/IsUserAccessable");

const GetUser = require("../services/User/GetUser");
const GetAuthenticatedUser = require("../services/User/GetAuthenticatedUser");
const GetUserByID = require("../services/User/GetUserByID");
const CreateNewUser = require("../services/User/CreateNewUser");
const VerifyUser = require("../services/User/VerifyUser");
const CreateForgotPasswordVerification = require("../services/User/CreateForgotPasswordVerification");
const UpdateForgottenPassword = require("../services/User/UpdateForgottenPassword");
const LogInUser = require("../services/User/LogInUser");
const LogOutUser = require("../services/User/LogOutUser");
const UpdateUser = require("../services/User/UpdateUser");
const DeleteUser = require("../services/User/DeleteUser");

router.get("/", IsUserAccessable, GetUser);
router.get("/me", CookieConsentAuthentication, GetAuthenticatedUser);
router.get("/:id", IsUserAccessable, GetUserByID);
router.post("/", CookieConsentAuthentication, CreateNewUser);
router.post("/verify", VerifyUser);
router.post("/forgot-password", CreateForgotPasswordVerification);
router.patch("/forgotten-password", UpdateForgottenPassword);
router.post("/login", CookieConsentAuthentication, LogInUser);
router.post("/logout", CookieConsentAuthentication, LogOutUser);
router.patch("/", CookieConsentAuthentication, Authenticate, UpdateUser);
router.delete("/", Authenticate, DeleteUser);

module.exports = router;
