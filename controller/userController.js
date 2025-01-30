import { errorResponse, successResponse } from "../helper/serverResponse.js";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
} from "../services/userServices.js";

export async function getuserHandler(req, res) {
  try {
    const data = getAllUsersService();
    if (!data) {
      errorResponse(res, 404, "data not found");
    }
    successResponse(res, "Success", data);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

export async function createuserHandler(req, res) {
  try {
    const { firstname, lastname, email, mobile } = req.body;
    if (!firstname || !lastname || !email || !mobile) {
      errorResponse(res, 404, "some params are missing");
    }
    const data = await createUserService({
      firstname,
      lastname,
      email,
      mobile,
    });

    successResponse(res, "Success", data);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

export async function udpateuserHandler(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (
      !updatedData.firstname ||
      !updatedData.lastname ||
      !updatedData.email ||
      !updatedData.mobile
    ) {
      return errorResponse(res, 400, "Some parameters are missing");
    }

    const updatedUser = await userService.updateUserService(id, updatedData);
    if (!updatedUser) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, "success Updated", updatedUser);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal server error ");
  }
}

export async function deleteuserHandler(req, res) {
  try {
    const { id } = req.params;
    const data = await deleteUserService(id);
    if (!data) {
      errorResponse(res, 404, "data not found");
    }
    successResponse(res, "success");
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
