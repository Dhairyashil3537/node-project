import { Router } from "express";
import {
  addproductHandler,
  deleteproductHandler,
  getallproductHandler,
  updateproductHandler,
} from "../controller/productController.js";

const productRouter = Router();

productRouter.get("/", getallproductHandler);
productRouter.post("/create", addproductHandler);
productRouter.put("/update/:id", updateproductHandler);
productRouter.delete("/delete", deleteproductHandler);

export default productRouter;
