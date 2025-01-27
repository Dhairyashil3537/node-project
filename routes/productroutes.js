import { Router } from "express";
import { errorResponse, successResponse } from "../helper/serverResponse.js";
import productmodel from "../model/productmodel.js";

const productRouter = Router();

productRouter.get("/", getallproductHandler);
productRouter.post("/create", addproductHandler);
productRouter.post("/update/:id", updateproductHandler);
productRouter.post("/delete", deleteproductHandler);

export default productRouter;

async function getallproductHandler(req, res) {
  try {
    const products = await productmodel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryid",
          foreignField: "id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails", // Flatten the categoryDetails array
      },
      {
        $project: {
          productid: "$_id",
          productName: 1,
          categoryid: "$categoryDetails._id",
          categoryName: "$categoryDetails.categoryName",
        },
      },
    ]);

    successResponse(res, "Success", products);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function addproductHandler(req, res) {
  try {
    const { productName, description, quantity } = req.body;
    if (!productName || !description || !quantity) {
      return errorResponse(res, 400, "some params are missing");
    }
    const product = await productmodel.create({
      productName,
      description,
      quantity,
    });
    successResponse(res, "success", product);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

async function updateproductHandler(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const options = { new: true };
    if (
      !updatedData.productName ||
      !updatedData.description ||
      !updatedData.quantity
    ) {
      return errorResponse(res, 404, "some param are missing");
    }

    const updated = await productmodel.findByIdAndUpdate(
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

async function deleteproductHandler(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(res, 404, "product ID not found");
    }
    // Now delete the product
    const product = await productmodel.findByIdAndDelete(id);
    if (!product) {
      return errorResponse(res, 404, "product not found");
    }

    successResponse(res, "product deleted successfully");
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
