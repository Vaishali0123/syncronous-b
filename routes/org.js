const express = require("express");
const router = express.Router();
const multer = require("multer");

const { fetchallmembers } = require("../controllers/org");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/fetchallmembers", fetchallmembers);

module.exports = router;
