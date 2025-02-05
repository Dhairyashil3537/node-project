import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  updateCategoryController,
} from "../controller/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await getAllCategoriesController();
    if (!categories) {
      return res.status(404).json("Categories not found");
    }
    return res.json({ message: "success", categories });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ error: error.message });
  }
});

categoryRouter.post("/create", async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(404).json("some param are missing");
    }
    const category = await createCategoryController(categoryName);
    return res.json("success", category);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!updatedData.categoryName) {
      return res.status(404).json("some param are missing");
    }

    const updated = await updateCategoryController(id, updatedData);
    return res.json("success Updated", updated);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json("Category ID not found");
    }
    const deletedCategory = await deleteCategoryController(id);
    if (!deletedCategory) {
      return res.status(404).json("Category not found");
    }

    return res.json("category deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

export default categoryRouter;
