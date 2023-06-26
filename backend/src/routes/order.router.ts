import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils";
import { OrderModel } from "../models/order.model";
import { Product } from "../models/product.model";
export const orderRouter = express.Router();

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({ user: req.user._id });
    return res.status(200).json(orders);
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      return res.status(200).json(order);
    } else {
      return res.status(404).json({ message: "Order not found!" });
    }
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      return res.status(400).send({ message: "Cart is empty!" });
    } else {
      const createdOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user?._id,
      });

      return res
        .status(201)
        .json({ message: "Order Created!", order: createdOrder });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id).populate("user");
    if (order) {
      (order.isPaid = true),
        (order.paidAt = new Date(Date.now())),
        (order.paymentResult = {
          paymentId: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        });

      const updatedOrder = await order.save();

      return res
        .status(201)
        .send({ order: updatedOrder, message: "Order paid successfully!" });
    }
    return res.status(404).send({ message: "Order not found!" });
  })
);
