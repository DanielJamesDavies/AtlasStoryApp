const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const GetUser = require("../services/User/GetUser");
const GetUserByID = require("../services/User/GetUserByID");
const CreateNewUser = require("../services/User/CreateNewUser");
const LogInUser = require("../services/User/LogInUser");
const LogOutUser = require("../services/User/LogOutUser");

router.get("/", Authenticate, GetUser);
router.get("/:id", Authenticate, GetUserByID);
router.post("/", CreateNewUser);
router.post("/login", LogInUser);
router.post("/logout", LogOutUser);

module.exports = router;
