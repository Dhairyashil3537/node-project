import { errorResponse, successResponse } from "../helper/serverResponse.js";
import {
  addProductService,
  deleteProductService,
  getAllProductsService,
  updateProductService,
} from "../services/productServices.js";

export async function getallproductHandler(req, res) {
  try {
    const products = await getAllProductsService();
    if (products.length === 0) {
      return errorResponse(res, 404, "No products found");
    }
    successResponse(res, "Success", products);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

export async function addproductHandler(req, res) {
  try {
    const { productName, description, quantity } = req.body;
    if (!productName || !description || !quantity) {
      return errorResponse(res, 400, "some params are missing");
    }
    const productData = {
      productName,
      description,
      quantity,
      categoryid,
    };
    const product = await addProductService(productData);
    successResponse(res, "success", product);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

export async function updateproductHandler(req, res) {
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

    const updatedProduct = await updateProductService(id, updatedData);
    if (!updatedProduct) {
      return errorResponse(res, 404, "Product not found");
    }
    successResponse(res, "success Updated", updated);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}

export async function deleteproductHandler(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(res, 404, "product ID not found");
    }
    const deletedProduct = await deleteProductService(id);
    if (!deletedProduct) {
      return errorResponse(res, 404, "Product not found");
    }

    successResponse(res, "product deleted successfully");
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
