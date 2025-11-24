// using that model we can save the order in our database
import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId:{type:String , required:true},
    items: {type:Array, required:true},
    amount: {type:Number, required:true},
    address: {type:Object, required:true},
    //the default is "Food Processing" so whenever a new order will be placed the status will be "Food Processing"
    status: {type:String, default:"Food Processing"},
    date: {type: Date, default:Date.now()},
    payment: {type:Boolean, default:false}
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;