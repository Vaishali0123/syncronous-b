const express = require("express");
const router = express.Router();
const multer = require("multer");

const { fetchallmsgs } = require("../controllers/messages");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/fetchallmsgs", fetchallmsgs);

module.exports = router;
