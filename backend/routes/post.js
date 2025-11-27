const express = require("express");
const router = express.Router();
const { addPost, getPosts } = require("../controllers/postcontroller");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const postController = require("../controllers/postcontroller");





router.post("/add" , authMiddleware , upload.single("image"), postController.addPost);
router.get("/", authMiddleware, postController.getPosts);

module.exports = router;
