// we will create the models using that we can store the products in the database
import mongoose from "mongoose";

// we will create the schema where we will describe the food model properties 
const foodSchema = new mongoose.Schema({
    // here name and we will define the type of this name property
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    image:{type:String, required:true},
    category:{type:String, required:true}
})

// now using this schema we will create the model : first i give him the model name then the schema 
// but we can create this model only once but when we run this file again it will create the model again
// to solve this issue here we type after equal mongoose.models.food and or operator
// so if this model will be already there it will be used if it not there then it will create a new model
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);
export default foodModel;