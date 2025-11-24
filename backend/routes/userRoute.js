import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"


// now we will create one router using the express router
const userRouter = express.Router();


userRouter.get("/", (req, res) => {
    res.send("User API root endpoint works!");
});


// after that we need the data of the user like email id and password to create the user 
// so here we will create one post method
userRouter.post("/register",registerUser);
userRouter.post("/login", loginUser);


export default userRouter;