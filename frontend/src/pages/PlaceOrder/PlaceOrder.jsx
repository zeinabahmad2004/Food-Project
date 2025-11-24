import React, { useContext, useState } from "react";
import './PlaceOrder.css'
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

    //we will create a state variable where we will store the information from the form fields
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    });

    // we will create an onChangeHandler function using that we will save the input field data in the
    // data state variable
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    //using this function we will be redirected to the payment gateway
    const placeOrder = async (event) => {
        event.preventDefault();
        //before we calling the api we have to structure all the orders data as we have created in api
        //here in this orderItems array we will add the cartItem related data
        let orderItems = [];
        food_list.map((item, index) => {
            // if cartItem have product with this item id
            if (cartItems[item._id]) {
                let itemInfo = item;
                //itemInfo is an object and this object we will add one property that is the quantity
                itemInfo["quantity"] = cartItems[item._id];
                //we are adding the all item data with the quantity in this orderItems
                orderItems.push(itemInfo);
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        }
        //now we will send this order data from our api 
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            //now we have to send the user on this session url, to send user in this session_url here we will use:
            //we are sending user to this session_url
            window.location.replace(session_url);
        }
        else {
            console.log(response);
            alert("Error");
        }
    }

    const navigate = useNavigate();


    useEffect(() => {
        if (!token) {
            //so whenever this block will be executed we will be navigated to the cart page
            navigate('/cart')
        }
        //if and that will be if our cart is empty in that case we will send the user on that cart page
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])





    return (
        <form action="" onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">
                    Delivery Information
                </p>
                <div className="multi-fields">
                    <input type="text" name="firstName" value={data.firstName} onChange={onChangeHandler} placeholder="First Name" required />
                    <input type="text" name="lastName" value={data.lastName} onChange={onChangeHandler} placeholder="Last Name" required />
                </div>
                <input type="email" name="email" value={data.email} onChange={onChangeHandler} placeholder="Email address" required />
                <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" required />
                <div className="multi-fields">
                    <input type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" required />
                    <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" required />
                </div>
                <div className="multi-fields">
                    <input type="text" name="zipCode" onChange={onChangeHandler} value={data.zipCode} placeholder="Zip code" required />
                    <input type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" required />
                </div>
                <input type="tel" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" required />
            </div>
            <div className="place-order-right">
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
                            <p>${getTotalCartAmount() === 0 ? 0 : "2"}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            {/* bold tag */}
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    {/* here we added the path slash order because in this app.jsx file we have defined route at this route we have placed the element PlaceOrder component */}
                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}
export default PlaceOrder