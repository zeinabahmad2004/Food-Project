import express from "express"
import authMiddleware from "../middleware/auth.js"
import {placeOrder, userOrders, verifyOrder, listOrders, updateStatus} from "../controllers/orderController.js"

// now using this express we will create the router
const orderRouter = express.Router();

//using this router we will create multiple endpoints
orderRouter.post("/place", authMiddleware, placeOrder);

orderRouter.post("/verify", authMiddleware ,verifyOrder);

orderRouter.post("/userOrders", authMiddleware, userOrders);

orderRouter.get("/list", listOrders);

orderRouter.post("/status", updateStatus);
export default orderRouter;