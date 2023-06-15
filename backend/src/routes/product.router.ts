import express from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";
export const productRouter = express.Router();

productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    return res.json(products);
  })
);

productRouter.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const product = await ProductModel.find({ slug: req.params.slug });
    if (!product)
      return res.status(404).json({ message: "Product Not Found!" });
    return res.json(product[0]);
  })
);
