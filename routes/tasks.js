const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  newtask,
  fetchalltasks,
  deletetask,
  updatetask,
} = require("../controllers/tasks");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/newtask", newtask);
router.post("/fetchalltasks", fetchalltasks);
router.post("/updatetask", updatetask);
router.post("/deletetask", deletetask);

module.exports = router;
