import React from "react";
import "./Verify.css";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//now we will create logic using that we get these parameters which is success true and orderId


const Verify = () => {
    //now to find the url parameter (to get the success and the id from the url of order page) we will use the use searchParam
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    // after that we get the backend url
    const { url } = useContext(StoreContext);

    //to navigate the user to different page
    const navigate = useNavigate();


    const verifyPayment = async () => {
        // here we call the api 
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                //if it true in that case we will navigate the users on different route that will be my orders 
                navigate("/myorders");
            }
            else {
                //in this case we navigate the user to home page
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }

    }

    //we will run this function when this component will be loaded
    useEffect(() => {
        verifyPayment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="verify">
            {/* we will display the spinner on the web page until the payment gets verified */}
            <div className="spinner">
            </div>
        </div>
    )
}
export default Verify