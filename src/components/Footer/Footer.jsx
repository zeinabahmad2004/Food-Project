import React from "react";
import './Footer.css'
import { assets } from "../../assets/assets";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Made with love and delivered with care. Thank you for choosing us to satisfy your cravings!</p>
                    <div className="footer-social-icons">
                        <FaFacebook className="facebook-icon icon"/>
                        <FaInstagram className="instagram-icon icon"/>
                        <FaLinkedin className="linkedin-icon icon"/>

                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+961 78 9*6 ***</li>
                        <li>Ahmadzeinab946@gmail.com</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Footer