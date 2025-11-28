const Post = require("../models/Post");

// Add new post
exports.addPost = async (req, res) => {
  try {
    const { title, description, mood, date } = req.body;

    const newPost = new Post({
      user: req.user.id,
      title,
      description,
      mood,
      date,
      image: req.file ? req.file.path : null, // Cloudinary URL
    });

    await newPost.save();
    res.status(201).json({ message: "Post created", newPost });
  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get posts of logged-in user
exports.getPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({ message: "Server error fetching posts", error: error.message });
  }
};
