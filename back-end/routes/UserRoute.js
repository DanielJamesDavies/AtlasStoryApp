const express = require("express");
const router = express.Router();

const Authenticate = require("../services/TokenAuthentication");
const GetUser = require("../services/User/GetUser");
const GetUserByID = require("../services/User/GetUserByID");
const CreateNewUser = require("../services/User/CreateNewUser");
const LoginUser = require("../services/User/LoginUser");

router.get("/", Authenticate, GetUser);
router.get("/:id", Authenticate, GetUserByID);
router.post("/", CreateNewUser);
router.post("/login", LoginUser);

module.exports = router;
