import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
// after importing this the env file will be included in our project
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// const userRouter = require('./routes/user');


//app config
const app = express()
const port = process.env.PORT || 4000;


//middleware (here we initialize our middleware)
// first middle ware will be express.json()
// using this middleware whenever we will get the request from the frontend to backend that will be passed using this json 
app.use(express.json())
// using this now we can access the backend from any frontend
app.use(cors())




//db connection
connectDB();





app.get('/', (req, res) => {
    res.send('Home works!');
});

//api endpoint
// so first we will create the API endpoints for the foodRoute
app.use("/api/food", foodRouter)
// now we will see how we can access this image using that we can show uploaded image on the frontend 
app.use("/images", express.static('uploads'))



//users:
app.use("/api/user", userRouter);


//cart
app.use("/api/cart", cartRouter);

//order
app.use("/api/order", orderRouter);



// after the initialize of middleware,
// we will add app.get method so the get method is a HTTP method using that we can request the data from the server so we are using app.get method
// there are more other methods like delete update post and they have different uses
// after that here we have to give the path (as parameter) where we want to run this endpoint,second parameter we pass one error function and this function will take the parameter request and response
// after that using this response we will create one response so let's add response.send and then in this send function whatever text we will write here that will be displayed on this endpoint 
// so whenever we will open this endpoint we will get the response "API Working"
// app.get("/",(req,res)=>{
//     res.send("API Working")
// })





// after that we run express server to run the express server  we will use:
// this listen function and give it the port number then a callback function
// so whenever our server will be running we will display one message in console 
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})


// note:to test the API we will not use the browser we will use one extension is thunder client in this extension we will test all our apis
