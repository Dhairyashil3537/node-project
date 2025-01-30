import express from "express";
import config from "./config.js";
import dbConnect from "./db.js";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import categoryRouter from "./routes/categoryRouter.js";

const app = express();
const port = config.PORT;

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);

//server and db connect
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is listening at ${port}`);
    });
  })
  .catch((error) => {
    console.log("error connecting server", error);
  });
