import React from "react";
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <div className="header-contents">
                <h2>Your Favorite Meals, Just a Click Away</h2>
                <p>Enjoy your favorite meals from the best local restaurants — delivered hot and fresh right to your doorstep. Order in 
                    just a few clicks and satisfy your cravings anytime, anywhere!</p>
                    <button className="header-btn">View Menu</button>
            </div>
        </div>
    )
}
export default Header