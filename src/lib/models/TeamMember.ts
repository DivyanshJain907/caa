import mongoose, { Schema, models, model } from "mongoose";

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    specialization: { type: String, required: true },
    about: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true },
);

export type TeamMemberDocument = mongoose.InferSchemaType<
  typeof TeamMemberSchema
>;

export default models.TeamMember || model("TeamMember", TeamMemberSchema);
