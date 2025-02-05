import productmodel from "../model/productmodel.js";

// Get all products with category details
export async function getAllProductsController() {
  try {
    return await productmodel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryid",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
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
  } catch (error) {
    throw new Error("Error fetching products with categories");
  }
}

// Add a new product
export async function addProductController(productData) {
  try {
    return await productmodel.create(productData);
  } catch (error) {
    throw new Error("Error adding product");
  }
}

// Update a product
export async function updateProductController(id, updatedData) {
  try {
    return await productmodel.findByIdAndUpdate(id, updatedData, { new: true });
  } catch (error) {
    throw new Error("Error updating product");
  }
}

// Delete a product
export async function deleteProductController(id) {
  try {
    return await productmodel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting product");
  }
}
