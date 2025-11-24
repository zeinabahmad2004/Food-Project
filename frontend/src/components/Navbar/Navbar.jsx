import React, { useContext, useState } from "react";
import './Navbar.css'
import { assets } from "../../assets/assets";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from "../../context/StoreContext";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";



const Navbar = ({ setShowLogin }) => {
    // here to add the line under active li
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate();


    //logout function:
    const logout = () => {
        // for logout we have to remove the token from localstorage
        // token is the key name
        localStorage.removeItem("token");
        // and from the token state we will remove the token it will be empty
        setToken("");
        // after that when the user will be logged out we will send them to the home page
        // to send the user to home page we will use useNavigate hook
        navigate("/");
    }
    return (
        <div className="navbar">
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
                <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <BsFillSearchHeartFill className="search-icon" />
                <div className="basket">
                    <Link to='/cart'><FaShoppingBasket className="basket-icon" /></Link>
                    <div className={getTotalCartAmount() ? "dot" : ""}></div>
                </div>
                {
                    //if token is not available in that case we will provide this button(the longin and sign up button)
                    !token ?
                        <button onClick={() => setShowLogin(true)}>Sign In</button> :
                        <div className="navbar-profile">
                            <img src={assets.profile} />
                            <ul className="nav-profile-dropdown">
                                <li onClick={() => navigate('/myorders')}><MdOutlineShoppingBag className="bag-icon" /><p>Orders</p></li>
                                <hr />
                                <li onClick={logout}><IoIosLogOut className="logout-icon" /><p>Logout</p></li>
                            </ul>
                        </div>
                }

            </div>
        </div>
    )
}
export default Navbar