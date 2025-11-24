import React from "react";
import "./MyOrders.css"
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useEffect } from "react";
import axios from "axios";
import { FaBox } from "react-icons/fa";


const MyOrders = () => {
    //fitch all the users data and fetch and save it in one state variable
    const [data, setData] = useState([]);

    //the url and token
    const { url, token } = useContext(StoreContext);

    //in this one we call the api
    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        //save the users order data in the data state variable
        setData(response.data.data);
        console.log(response.data.data);
    }

    //we want to call the function whenever the component will be loaded, suppose user login or logout on thr web page in thet case
    //we have to again execute the useEffect
    useEffect(() => {
        //here we check if the token is available
        if (token) {
            //in this case we will run the fetch function
            fetchOrders();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])




    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <FaBox className="box-icon" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + ","
                                }
                            })}</p>
                            <p>${order.amount.toFixed(2)}</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default MyOrders