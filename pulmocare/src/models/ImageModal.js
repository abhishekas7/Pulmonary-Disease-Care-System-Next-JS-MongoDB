import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ImageModel = mongoose.models.Image || mongoose.model("Image", ImageSchema);

export default ImageModel;
