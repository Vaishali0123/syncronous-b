const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  signup,
  signin,
  forgotpass,
  updatedetails,
} = require("../controllers/userAuth");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup", upload.single("image"), signup);
router.post("/signin", signin);
router.post("/forgotpass", forgotpass);
router.post("/updatedetails", updatedetails);

module.exports = router;
