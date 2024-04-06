import { Schema, model, models } from "mongoose";

const PageAnalyticSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["click", "view"],
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
    url: String,
  },
  { timestamps: true },
);

// @ts-ignore
const PageAnalytic =
  models.PageAnalytic || model("PageAnalytic", PageAnalyticSchema);

export default PageAnalytic;
