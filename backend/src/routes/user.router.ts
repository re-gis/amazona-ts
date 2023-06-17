import expressAsyncHandler from "express-async-handler";
import express, { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";

export const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { password, email } = req.body;
    if (!password || !email)
      return res.status(401).send({ message: "All credentials are required!" });
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }
    }

    return res.status(201).send({ message: "Invalid email or password" });
  })
);
