/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import expressAsyncHandler from "express-async-handler";
import express, { Request, Response } from "express";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";

export const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req: any, res: any) => {
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

    return res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req: any, res: any) => {
    const u = await UserModel.findOne({ email: req.body.email });
    if (u)
      return res
        .status(401)
        .send({ message: `${req.body.email} already used!` });
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User);

    return res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);
