import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    mobile: String,
  },
  { timestamps: true }
);

const usermodel = model("user", userSchema);

export default usermodel;
