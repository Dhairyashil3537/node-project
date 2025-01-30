import { Router } from "express";
import {
  createuserHandler,
  deleteuserHandler,
  getuserHandler,
  udpateuserHandler,
} from "../controller/userController.js";

const userRouter = Router();

userRouter.get("/", getuserHandler);
userRouter.post("/create", createuserHandler);
userRouter.put("/update/:id", udpateuserHandler);
userRouter.delete("/delete/:id", deleteuserHandler);

export default userRouter;
