import { Router } from "express";
import {
  addProductController,
  deleteProductController,
  getAllProductsController,
  updateProductController,
} from "../controller/productController.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProductsController();
    if (products.length === 0) {
      return res.status(404).json("No products found");
    }
    return res.json("success", products);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.post("/create", async (req, res) => {
  try {
    const { productName, description, quantity } = req.body;
    if (!productName || !description || !quantity) {
      return res.status(404).json("some param are missing");
    }
    const productData = {
      productName,
      description,
      quantity,
      categoryid,
    };
    const product = await addProductController(productData);

    return res.json("success", product);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const options = { new: true };
    if (
      !updatedData.productName ||
      !updatedData.description ||
      !updatedData.quantity
    ) {
      return res.status(404).json("some param are missing");
    }

    const updatedProduct = await updateProductController(id, updatedData);
    if (!updatedProduct) {
      return res.status(404).json("Product not found");
    }
    return res.json("success Updated", updated);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json("Product ID not found");
    }
    const deletedProduct = await deleteProductController(id);
    if (!deletedProduct) {
      return res.status(404).json("Product not found");
    }

    return res.json("product deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

export default productRouter;
