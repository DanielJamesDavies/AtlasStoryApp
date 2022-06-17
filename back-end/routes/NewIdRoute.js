const express = require("express");
const router = express.Router();

const GetNewID = require("../services/GetNewID");

router.get("/", GetNewID);

module.exports = router;
