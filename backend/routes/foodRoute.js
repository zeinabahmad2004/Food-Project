import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
// now using this multer we will create the image storage system
import multer from "multer"


// we will create one express router
// using this router we can create get method post method and many other method 
const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    // we will add the destination property where we will provide the folder name where i want to store the image 
    destination: "uploads",
    // cb: callback
    filename: (req,file,cb)=>{
        // after the null we will use the template literal to rename our file and we will add a unique name for each image  
        // using the date method our file name will become unique and after that we have to provide one extension file.originalname 
        return cb (null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer ({storage:storage});


// lets create one post request: we use the post method to send data on the server and on the server our data will be process processed and after that we will get one response 
// for example when we fill a form that form data will be sent using the post method if i have to upload a file we have to use the post method 
// to use that api in this endpoint we have to use localhost:4000/api/food/add
foodRouter.post("/add", upload.single("image"), addFood)

// we will create the list-food api endpoint using that we can display all the food item listed in the database 
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood);

export default foodRouter;