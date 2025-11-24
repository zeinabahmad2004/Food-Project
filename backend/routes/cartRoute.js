import express, { Router } from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/CartController.js"
import authMiddleware from "../middleware/auth.js";


// here we create one express Router (using this router we will create multiple endpoints)
const cartRouter = express.Router();

// we add the auth middleware on this three route
cartRouter.post("/add", authMiddleware, addToCart)

cartRouter.post("/remove" , authMiddleware, removeFromCart)

cartRouter.post("/get", authMiddleware, getCart)

export default cartRouter;