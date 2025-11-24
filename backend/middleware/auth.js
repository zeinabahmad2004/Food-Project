// when user will send the data they will use token to authenticate them to decode the token we will use the middleware
import jwt from "jsonwebtoken"

// here we will create one async arrow function
// next : is a callback function
const authMiddleware = async (req,res,next)=>{
    // in create this middleware first we will take the token from the users using the header then we destructure the token from the request.header
    const { token } = req.headers;
    // now we will check whether we got the token or not
    if (!token){
        return res.json({success:false, message:"Not Authorized Login Again"});
    }
    try{
        // if we have the token we will decode that token
        // we give to verify method the token we take from the header and the jwt_secret we add in .env file
        // when we generated the token we have one object with the id so when we decode it we will get that ID (in the variable token_decode)
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // now we set that ID in request body user ID 
        req.body.userId = token_decode.id;
        // now we will call the call back function which is next 
        next();
    }
    catch (error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


// so this middleware will basically take the token and convert it in the userId and using that userId we can add remove or get the data from the cart
export default authMiddleware;