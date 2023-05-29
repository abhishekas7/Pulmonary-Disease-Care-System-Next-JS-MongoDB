const mongoose = require("mongoose");

if (mongoose.models.BlogPost) {
  // If the model is already defined, use it
  module.exports = mongoose.models.BlogPost;
} else {
  // Define the model
  const Schema = mongoose.Schema;

  const blogPostSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });

  const BlogPost = mongoose.model("BlogPost", blogPostSchema);

  module.exports = BlogPost;
}
