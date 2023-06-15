import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";
import { sampleProducts } from "../data";

export const seedRouter = express.Router();

seedRouter.get(
  "/",
  expressAsyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);
    return res.json({ createdProducts });
  })
);
