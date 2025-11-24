import mongoose from "mongoose";

// we will define one schema for our user
const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    // the unique is suppose one email id is already used to create an account we cannot create another account with
    // that email id because we have added unique true
    email: {type:String, required:true, unique:true},
    password:{type:String, required:true},
    // we have to create one cartData where we will manage the user's cart and the type will be object and by default 
    //the cart will be empty
    cartData:{type:Object, default:{}}
    // and we will add minimize false if we don't add this false in that case this cartData will not be created because 
    // we have not provided any data here (in the cartData object)
    // In Mongoose, setting minimize: false in a schema option prevents the ODM from automatically removing empty objects 
    // from your documents. This is useful when you want to ensure that certain nested fields, even if they are empty, 
    // are explicitly stored in the database
},{minimize:false})

// here in or operator we say if the model is already created that model will be used or if the model is not created it will create the model
const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel;