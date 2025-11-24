import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom"

const Cart = () => {
    // first we will access our cartItems food_list from from cart functionality from our context
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
    // It gives you access to a function (navigate) that lets you change pages(navigate) programmatically — meaning with JavaScript, not by clicking a < Link >
    // When you click the button, React Router changes the URL to / about without reloading the page.
    const navigate = useNavigate();


    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <>
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    {/* it will return the quantity for this product */}
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <p className="cross" onClick={() => removeFromCart(item._id)}>X</p>
                                </div>
                                <hr />
                            </>
                        );
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            {/* bold tag */}
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    {/* here we added the path slash order because in this app.jsx file we have defined route at this route we have placed the element PlaceOrder component */}
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="Promo code" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Cart;
