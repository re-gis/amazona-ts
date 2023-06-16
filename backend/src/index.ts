import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { productRouter } from "./routes/product.router";
import { seedRouter } from "./routes/seed.router";
import { userRouter } from "./routes/user.router";
const app = express();
dotenv.config();

/* DATABASE */
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/tsamazona";

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("DB Connected!"))
  .catch(() => console.log("Error connecting to DB!"));

/* CORS */
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

/* SEED ROUTES */
app.use('/api/seed', seedRouter)

/* ROUTES */
app.use("/api/products", productRouter);

app.use('/api/users', userRouter)

app.listen(4000, () => {
  console.log("Node server running on port 4000...");
});
