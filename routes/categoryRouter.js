import { Router } from "express";
import {
  createcategoryHandler,
  deletecategoryHandler,
  getallcategoryHandler,
  updatecategoryHandler,
} from "../controller/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getallcategoryHandler);
categoryRouter.post("/create", createcategoryHandler);
categoryRouter.put("/update/:id", updatecategoryHandler);
categoryRouter.delete("/delete", deletecategoryHandler);

export default categoryRouter;
