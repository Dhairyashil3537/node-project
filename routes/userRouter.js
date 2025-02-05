import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  updateUserController,
} from "../controller/userController.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const data = await getAllUsersController();
    if (!data) {
      return res.status(404).json("data not found");
    }
    return res.json("success", data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/create", async (req, res) => {
  try {
    const { firstname, lastname, email, mobile } = req.body;
    if (!firstname || !lastname || !email || !mobile) {
      return res.status(404).json("some param are missing");
    }
    const data = await createUserController({
      firstname,
      lastname,
      email,
      mobile,
    });

    return res.json("success", data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (
      !updatedData.firstname ||
      !updatedData.lastname ||
      !updatedData.email ||
      !updatedData.mobile
    ) {
      return res.status(404).json("some param are missing");
    }

    const updatedUser = await updateUserController(id, updatedData);
    if (!updatedUser) {
      return res.status(404).json("User not found");
    }

    return res.json("success Updated", updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

userRouter.delete("/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteuserHandler(id);
    if (!data) {
      return res.status(404).json("User not found");
    }
    return res.json("success");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
