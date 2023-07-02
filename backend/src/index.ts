import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { productRouter } from "./routes/product.router";
import { seedRouter } from "./routes/seed.router";
import { userRouter } from "./routes/user.router";
import { orderRouter } from "./routes/order.router";
import path from "path";
import "colors";
import { keyRouter } from "./routes/key.router";
const app = express();
dotenv.config();

app.use(express.json());

/* DATABASE */
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/tsamazona";

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`DB Connected!`.underline.bgYellow.black))
  .catch(() => console.log("Error connecting to DB!".underline.red));

/* CORS */
app.use(
  cors({
    credentials: true,
    origin: ["http://127.0.0.1:5173", "https://tsamazona.onrender.com"],
  })
);

/* SEED ROUTES */
app.use("/api/seed", seedRouter);

/* -------------- ROUTES ---------------- */

// Products
app.use("/api/products", productRouter);

// Users
app.use("/api/users", userRouter);

// Orders
app.use("/api/orders", orderRouter);

// Keys
app.use("/api/keys", keyRouter);

/* -------------------------------------- */

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.listen(4000, () => {
  console.log("Node server running on port 4000...".underline.bgCyan);
});
