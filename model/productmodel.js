import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productName: String,
    description: String,
    quantity: Number,
    categoryid: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const productmodel = model("product", productSchema);

export default productmodel;
