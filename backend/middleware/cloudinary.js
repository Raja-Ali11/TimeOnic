const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Cloudinary config
cloudinary.config({
  cloud_name: "dvinphoto",    // replace with your Cloudinary cloud name
  api_key: "991586729649297",          // replace with your Cloudinary API key
  api_secret: "lCULH_IjsnRxVhvislwbjlKYAqM",    // replace with your Cloudinary API secret
});

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "posts",               // folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;
