import express from "express";
import config from "./config.js";
import dbConnect from "./db.js";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/userroutes.js";
import productRouter from "./routes/productroutes.js";
import categoryRouter from "./routes/categoryroutes.js";

const app = express();
const port = config.PORT;
const prod = config.ENV === "prod";

app.use(
  morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms"
  )
);

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is listening at ${port}`);
    });
  })
  .catch((error) => {
    console.log("error connecting server", error);
  });
