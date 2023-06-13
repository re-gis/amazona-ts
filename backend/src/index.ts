import express, { Request, Response } from "express";
import { sampleProducts } from "./data";
import cors from "cors";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/api/products", (req: Request, res: Response) => {
  return res.status(200).json(sampleProducts);
});


app.get('/api/products/:slug', (req: Request, res: Response) => {
  return res.json(sampleProducts.find((x) => x.slug === req.params.slug))
})

app.listen(4000, () => {
  console.log("Node server running on port 4000...");
});
