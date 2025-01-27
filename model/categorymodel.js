import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const categorymodel = model("category", categorySchema);

export default categorymodel;
