// we will create API using that we can add the new food item in our database
import foodModel from "../models/foodModel.js"
// we import a file system from and here we are using this FS that is pre-build in the node.js
import fs from 'fs'


//add food item
const addFood = async (req,res) => {
    // so first we will add one variable to store the name of the image
    let image_filename = `${req.file.filename}`;

    // then we will create a new food using the food model 
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try{ 
        // using this method this food item will be saved in the database 
        await food.save();
        // after that we have to create one response to create the response we will use the json method 
        // and here we will send one object as a response where we will add success true and we add the message property where we will add a text  
        res.json({success:true,message:"Food Added"})
    }catch(error){
        // if we get any error while saving the food in that case this catch block will be executed 
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//All Food List 
const listFood = async (req,res) => {
    // here we have to create the logic using that we can access all the food item and send them as a response 
    try{
        // using this model we can fetch all food items for that we'll .find nad in this method we can simply add one empty object
        // in this variable we will get all the data of the food items
        const food = await foodModel.find({});
        res.json({success:true,data:food})
    }catch (error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


//Remove food item
const removeFood =  async (req,res) => {
    try{
        // first we have to find the food item that we want to delete to find food item
        const food = await foodModel.findById(req.body.id);
        // we have to delete the image of this food item from the uploads folder 
        // in the unlike we set the path so it isin the uploads folder and the name of the image
        fs.unlink(`uploads/${food.image}`, ()=>{})
        // here our food data will be deleted from the database and using the fs.unlink line we can delete the image from the uploads folder
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// using this function we will create one route
export{addFood, listFood, removeFood}
