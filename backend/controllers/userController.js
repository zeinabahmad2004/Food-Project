import userModel from "../models/userModel.js"
// using that jwt we will create the authentication
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
// first function we will create the loginUser
const loginUser = async (req,res) => {
    // here we need the users email and password from the request body
    const {email , password} = req.body;
    try{
        // first we will check whether one user is available with this email id
        const user = await userModel.findOne({email});
        if(!user){
            // we will generate one response that we didn't get any user
            return res.json({success:false, message:"User doesn't exist"})
        }
        // if we are getting the user in that case we will match the user's password with the stored password in the database
        // here we have to pass two arguments that is users password and the password stored in database
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        // if the password is matching in that case we will generate one token
        const token = createToken(user._id);
        res.json({success:true, token})
    }catch{
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// create token
// to this token we need the users id that will self generated in database
const createToken = (id) => {
    // we will provide one object where it will store id and also we have to provide one salt using that our data will be encrypted
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res) => {

    console.log("REGISTER CONTROLLER HIT");  // 👈 ADD THIS

    // we will create the logic using that we can allow user to register on the website
    // so first we have to destructure that name email and password from the request body
    const {name, password, email} = req.body;
    try{
        // so in the try block first we will check if any user exist with this email if any user is already available 
        // with this email id we will generate one response 
        // the findOne method is a function within a controller that fetches a single record or item from the database
        const exist = await userModel.findOne({email});
        // if any email id is available in that case we will return one response dot json in this response we will add one object we will add success
        // property as false then we will add the message
        if(exist){
            return res.json({success:false, message:"User already exists"})
        }

        //we will validate the email format and a strong password 
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false, message:"Please enter strong password"})
        }
        // before creating the account we will encrypt this password
        // to encrypt the password we will use the encrypt package (hashing user password)
        // in the getSalt we will add the number between 5 to 15 so as higher number we will put it will create the strongest password according to that number
        const salt = await bcrypt.genSalt(10)
        // after that salt we  will create the encrypted password using this salt
        const hashedPassword = await bcrypt.hash(password,salt)


        // now we have to create a new user using the name email and has password
        const newUser = new userModel({
            name: name,
            email:email,
            password: hashedPassword
        })

        // we have to save the user in the database
        const user = await newUser.save()

        // after that we will create one token and we will send this token using response to the user
        // we have to take the user ID and generate one token 
        const token = createToken(user._id)

        // now we send this token as a response
        res.json({success:true, token});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {loginUser, registerUser}