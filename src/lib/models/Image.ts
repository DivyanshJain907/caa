import mongoose, { Schema, models, model } from "mongoose";

const ImageSchema = new Schema(
  {
    name: { type: String, required: true },
    data: { type: String, required: true }, // Base64 encoded image data
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true },
);

export type ImageDocument = mongoose.InferSchemaType<typeof ImageSchema>;

export default models.Image || model("Image", ImageSchema);
