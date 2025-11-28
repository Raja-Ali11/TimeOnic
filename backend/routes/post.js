const express = require("express");
const router = express.Router();
const { addPost, getPosts } = require("../controllers/postcontroller");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/cloudinary"); // Cloudinary Multer

// Add new post with image (Cloudinary)
router.post("/add", authMiddleware, upload.single("image"), addPost);

// Get posts of logged-in user
router.get("/", authMiddleware, getPosts);

module.exports = router;
