//in this file we will create the logic using that we can connect with the database
import mongoose from "mongoose";

// we will add one arrow function and the name will be connectDb it will be async arrow function
export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://food-project:zee123456@cluster0.i7z7zdy.mongodb.net/Projects").then(()=>console.log("DB Connected"));
}
