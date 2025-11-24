import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
//Stripe is a payment processing platform that is widely used in web and mobile applications to 
// handle online payments securely. In the backend, Stripe plays a very specific and important role.
import Stripe from "stripe"



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//placing user order from frontend
// using that we can place the users order
const placeOrder = async (req,res) => {
    const frontend_url = "https://food-delivery-frontend1-e843.onrender.com/"


    try{
        const newOrder = new orderModel({
            // this userId we will get fromm middleware
            userId:req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        // now we have to clear user cart
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        //after that we can create the payment link using the stripe 
        //we have first to create line items where we will insert all the product data currency and unit amount and quantity
        const line_items = req.body.items.map((item) =>({
            price_data:{
                currency:"USD",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"USD",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity: 1
        })

        //now using this line item we will create one session 
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({success:true, session_url:session.url})
    }catch (error){
        res.json({success:false,message:"order error"})
    }
}

// to verify the order:
//here we will add the logic using that we can verify the order payment 
const verifyOrder = async (req,res) => {
    //so here first we need the order id  and success (we get it from the request.body)
    //note ::: while calling api we will pass this data as a string
    const {orderId, success} = req.body;
    try{
        if(success=="true"){
            // so if the success is true in that case we will make the payment true 
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"});
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//user Orders for frontend
const userOrders = async (req,res) => {
    try{
        //we will find the all orders of that user using their userId
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({success:true, data:orders});
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

//listing orders for admin panel
//using that we can find all the orders of all the users 
const listOrders = async (req,res) => {
    //here we will add the logic to fetch all the order details 
    try{
        //using that we get all the orders data in this variable 
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status
const updateStatus = async (req,res) => {
    try{
        //first we will find the order by using the ID
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    }catch (error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus} 
