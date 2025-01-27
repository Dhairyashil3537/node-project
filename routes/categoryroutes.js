import { Router } from "express";
import categorymodel from "../model/categorymodel.js";
import { successResponse, errorResponse } from "../helper/serverResponse.js";

const categoryRouter = Router();

categoryRouter.get("/", getallcategoryHandler);
categoryRouter.post("/create", createcategoryHandler);
categoryRouter.post("/update/:id", updatecategoryHandler);
categoryRouter.post("/delete", deletecategoryHandler);

export default categoryRouter;

async function getallcategoryHandler(req, res) {
  try {
    const category = await categorymodel.find();
    if (!category) {
      return errorResponse(res, 404, "category not found");
    }
    successResponse(res, "Success", category);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function createcategoryHandler(req, res) {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      return errorResponse(res, 400, "some params are missing");
    }
    const category = await categorymodel.create({
      categoryName,
    });
    successResponse(res, "success", category);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function updatecategoryHandler(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const options = { new: true };
    if (!updatedData.categoryName) {
      return errorResponse(res, 404, "some param are missing");
    }

    const updated = await categorymodel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    successResponse(res, "success Updated", updated);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function deletecategoryHandler(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(res, 404, "category ID not found");
    }
    // Now delete the product
    const product = await categorymodel.findByIdAndDelete(id);
    if (!product) {
      return errorResponse(res, 404, "category not found");
    }

    successResponse(res, "category deleted successfully");
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
