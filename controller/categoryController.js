import categorymodel from "../model/categorymodel.js";

// Get all categories
export async function getAllCategoriesController() {
  try {
    return await categorymodel.find();
  } catch (error) {
    throw new Error("Error fetching categories");
  }
}

// Create a category
export async function createCategoryController(categoryName) {
  try {
    const existingCategory = await categorymodel.findOne({ categoryName });
    if (existingCategory) {
      throw new Error("Category already exists");
    }

    const category = await categorymodel.create({ categoryName });
    return category;
  } catch (error) {
    throw new Error(error.message || "Error creating category");
  }
}

// Update a category
export async function updateCategoryController(id, updatedData) {
  try {
    const updatedCategory = await categorymodel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    return updatedCategory;
  } catch (error) {
    throw new Error("Error updating category");
  }
}

// / Delete a category
export async function deleteCategoryController(id) {
  try {
    const deletedCategory = await categorymodel.findByIdAndDelete(id);
    return deletedCategory;
  } catch (error) {
    throw new Error("Error deleting category");
  }
}
