
const mongoose = require("mongoose");


 const PostSchema = new mongoose.Schema(
   {
     user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },

    mood: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    date: {
       type: Date,
       required: true,
     },
   },
   { timestamps: true }
 );

module.exports = mongoose.model("post", PostSchema);