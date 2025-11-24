import React, { useState } from "react";
import './LoginPopup.css'
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"

const LoginPopUp = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState("Login")

    const { url, setToken } = useContext(StoreContext);

    // now we will create the state variable where we will save the users name, email , and password
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    // we will create one onChangeHandler: that will take the data from the input field and saved in the state variable
    const onChangeHandler = (event) => {
        // here we take the name of the input we add
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }


    // for user login we will create one function and we will link this function with form tag
    const onLogin = async (event) => {
        event.preventDefault();

        // and here we will add the logic using that we can call this apis
        // so we want to create one instance of the url (we takr from useContext)
        let newURL = url;

        // we will check if our currentState is login (if we are in the login page not sign up)
        if (currentState === "Login") {
            // then we go to login endpoint
            newURL += "/api/user/login"
        } else {
            // then we go to the register endpoint
            newURL += "/api/user/register"
        }

        // after that we call api(post since the methos i used is created by post method)
        const response = await axios.post(newURL, data);

        if (response.data.success) {
            // if this success is true it means we are logged in or we have registered so we wil get one token
            // so to save token we will use one state variable where we will save the token
            setToken(response.data.token);
            // we will save this token in local storage
            localStorage.setItem("token", response.data.token);
            // after that we will use setShowLogin function and hide the login page
            setShowLogin(false);
        }
        else {
            alert(response.data.message);
        }
    }


    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <RxCross2 className="cross-icon" onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-inputs">
                    {/* now we have to remove this input field that is your name on the login page */}
                    {
                        currentState === "Sign Up" ? <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required /> : <></>
                    }
                    <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Your email" required />
                    <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Your password" required />
                </div>
                <button type="submit">{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {
                    currentState === "Sign Up"
                        ? <p>already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                        : <p>Create a new acount? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                }
            </form>
        </div>
    )
}
export default LoginPopUp