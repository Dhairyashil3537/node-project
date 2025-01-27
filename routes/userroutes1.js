import { Router } from "express";
import { errorResponse, successResponse } from "../helper/serverResponse.js";
import usermodel from "../model/usermodel.js";

const userRouter = Router();

userRouter.get("/", getuserHandler);
userRouter.post("/create", createuserHandler);

export default userRouter;

async function getuserHandler(req, res) {
  try {
    const user = await usermodel.find();
    if (!user) {
      return errorResponse(res, 404, "users not found");
    }
    successResponse(res, "success", user);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function createuserHandler(req, res) {
  try {
    const { firstname, lastname, email, mobile } = req.body;
    if (!firstname || !lastname || !email || !mobile) {
      return errorResponse(res, 400, "some params missing");
    }
    const params = { firstname, lastname, email, mobile };
    const user = await usermodel.create(params);
    if (!user) {
      return errorResponse(res, 404, "user not create");
    }
    successResponse(res, "Success", user);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
