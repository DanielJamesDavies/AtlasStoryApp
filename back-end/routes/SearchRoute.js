const express = require("express");
const router = express.Router();

const GetSearchResults = require("../services/Search/GetSearchResults");

router.get("/", GetSearchResults);

module.exports = router;
