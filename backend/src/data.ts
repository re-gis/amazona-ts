import { User } from "./models/user.model";
import { Product } from "./models/product.model";
import bcrypt from "bcryptjs";

export const sampleProducts: Product[] = [
  {
    name: "Nike Slim Shirt",
    slug: "nike-slim-shirt",
    image: "../images/p1.jpg",
    category: "Shirts",
    price: 120,
    brand: "Nike",
    countInStock: 0,
    description: "high quality product",
    rating: 1.5,
    numReviews: 5,
  },
  {
    name: "Adidas Fit Shirt",
    slug: "Adidas-fit-shirt",
    category: "Shirts",
    image: "../images/p2.jpg",
    price: 250,
    countInStock: 20,
    brand: "Adidas",
    rating: 5.0,
    numReviews: 10,
    description: "High quality shirt",
  },
  {
    name: "Lacoste Free Pants",
    slug: "lacoste-free-pant",
    category: "Pants",
    image: "../images/p3.jpg",
    price: 25,
    countInStock: 15,
    brand: "Lacoste",
    rating: 3.5,
    numReviews: 14,
    description: "High quality product",
  },
  {
    name: "Nike Slim Pant",
    slug: "nike-slim-pant",
    category: "Pants",
    image: "../images/p4.jpg",
    price: 65,
    countInStock: 5,
    brand: "Nike",
    rating: 2.5,
    numReviews: 10,
    description: "High quality product",
  },
];

export const sampleUsers: User[] = [
  {
    name: "John Doe",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Guest",
    email: "guest@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
];
