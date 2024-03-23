import { Schema, model, models } from "mongoose";

const PageSchema = new Schema(
  {
    uri: { type: String, required: true, unique: true, minLength: 1 },
  },
  {
    timestamps: true,
  }
);

// @ts-ignore
const Page = models.Page || model("Page", PageSchema);
Page.createIndexes();

export default Page;
