import { Router } from "express";
import { errorResponse, successResponse } from "../helper/serverResponse.js";
import usermodel from "../model/usermodel.js";

const userRouter = Router();

userRouter.get("/", getuserHandler);
userRouter.post("/create", createuserHandler);
userRouter.post("/update/:id", udpateuserHandler);
userRouter.get("/delete/:id", deleteuserHandler);

export default userRouter;
async function getuserHandler(req, res) {
  try {
    const data = await usermodel.find();
    if (!data) {
      errorResponse(res, 404, "data not found");
    }
    successResponse(res, "Success", data);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function createuserHandler(req, res) {
  try {
    const { firstname, lastname, email, mobile } = req.body;
    if (!firstname || !lastname || !email || !mobile) {
      errorResponse(res, 404, "some params are missing");
    }
    const data = await usermodel.create({ firstname, lastname, email, mobile });
    if (!data) {
      errorResponse(res, 404, "data not created");
    }
    successResponse(res, "Success", data);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function udpateuserHandler(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const options = { new: true };

    const updated = await usermodel.findByIdAndUpdate(id, updatedData, options);
    if (
      !updatedData.firstname ||
      !updatedData.lastname ||
      !updatedData.email ||
      !updatedData.mobile
    ) {
      errorResponse(res, 500, "internal server error");
      return;
    }
    successResponse(res, "success Updated", updated);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal server error ");
  }
}

async function deleteuserHandler(req, res) {
  try {
    const { id } = req.params;
    const data = await usermodel.findByIdAndDelete(id);
    if (!data) {
      errorResponse(res, 404, "data not found");
    }
    successResponse(res, "success");
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
