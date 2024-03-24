import { Schema, model, models } from "mongoose";

const PageSchema = new Schema(
  {
    uri: { type: String, required: true, unique: true, minLength: 1 },
    owner: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// @ts-ignore
const Page = models.Page || model("Page", PageSchema);
Page.createIndexes();

export default Page;
