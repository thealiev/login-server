const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      default: ''
    },
    comments: {
      type: Array,
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
