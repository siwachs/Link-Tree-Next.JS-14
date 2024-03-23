import { Schema, model, models } from "mongoose";

const PageSchema = new Schema(
  {
    uri: { type: String, required: true, min: 1, unique: true },
  },
  { timestamps: true }
);

// @ts-ignore
const Page = models.Page || model("Page", PageSchema);

export default Page;
