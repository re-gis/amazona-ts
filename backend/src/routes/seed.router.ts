/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";
import { sampleProducts, sampleUsers } from "../data";
import { UserModel } from "../models/user.model";

export const seedRouter = express.Router();

seedRouter.get(
  "/",
  expressAsyncHandler(async (req: any, res: any) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);

    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);

    return res.json({ createdProducts, createdUsers });
  })
);
