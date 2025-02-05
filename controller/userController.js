import usermodel from "../model/usermodel.js";

// Get all users
export async function getAllUsersController() {
  try {
    const users = await usermodel.find();
    return users;
  } catch (error) {
    throw new Error("Error fetching users from the database.");
  }
}

// Create a new user
export async function createUserController({
  firstname,
  lastname,
  email,
  mobile,
}) {
  try {
    // Check if the user already exists
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    // Create new user
    const newUser = await usermodel.create({
      firstname,
      lastname,
      email,
      mobile,
    });
    return newUser;
  } catch (error) {
    throw new Error(error.message || "Error creating user.");
  }
}

// Update a user by ID
export async function updateUserController(id, updatedData) {
  try {
    const updatedUser = await usermodel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user.");
  }
}

// Delete a user by ID
export async function deleteUserController(id) {
  try {
    const deletedUser = await usermodel.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw new Error("Error deleting user.");
  }
}
