import userModel from "../models/userModel.js"

//add items to user Cart
const addToCart = async (req,res) => {
    // if user will send the item id using that id we can add one entry in their cart
    try{
        // now we have to find a user data 
        // findOne: in this method we will add one oject where we will add the condition the user id should be request.body.userId
                    // so will we finding the user we have provided this condition the _id should be same as Request.body.userId
        // so will reuesting we will not send the id we will send the token and this middleware (authMiddleware.js) will convert the token 
        // in the userId that we have use here in the findOne method after that the findOne method will return all the data of that user 
        // in this user data we will extract the cartData
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        // now in this cartData we will modified the data so we are using addToCart functionality 
        // so when user will have to add the data in the cart then they will send the token and with that they will send the item id
        if (!cartData[req.body.itemId]){
            // if the item is first time to add in the cart it will create a new entry for it
            cartData[req.body.itemId] = 1;
        }
        else{
            // if the item already in the cart we will just increase that value
            cartData[req.body.itemId] += 1;
        }
        // now after that when that item will be added in the cart then we have to update this cartData in the database
        // findByIdAndUpdate is take two argument one for the user id and the second will be one object and in this object we have to prvide
        // the new cartData
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Added To Cart"});
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


//remove items from user cart
const removeFromCart = async (req,res) => {
    try{
        // first we will find the user data using findById method
        // again we say we take this userId from the middleware that will decode out token and convert it in the userId
        let userData = await userModel.findById(req.body.userId);
        // after that we have to extract the cartData
        let cartData = await userData.cartData;

        // first we will check for this itemId that i want to remove from that id if the item is available in the cart or not
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        // now we will update the new cartData
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});

        res.json({success:true,message:"Removed From Cart"})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


//fetch user cart data
const getCart = async (req,res) => {
    try{
        // first using the userId we will find the users data ( the userId we get it by middleware)
        let userData = await userModel.findById(req.body.userId);

        // from this userData we can extract the cartData
        let cartData = await userData.cartData;

        res.json({success:"true", cartData});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"false"});
    }
}

export {addToCart,removeFromCart,getCart}