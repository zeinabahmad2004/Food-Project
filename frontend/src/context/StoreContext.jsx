import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios"

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    // here we have to set the backend url and we pass this variable in the context value
    const url = "http://localhost:4000"


    // state variable for the token
    const [token, setToken] = useState("");


    const [food_list, setFoodList] = useState([]);

    // now we will create a function using that we can load the food items in the browser from the database
    const fetchFoodList = async () => {
        // here we will call the API (here i use get method because we have created the foodlist using the get method)
        const response = await axios.get(url + "/api/food/list");

        setFoodList(response.data.data)
    }





    const addToCart = async (itemId) => {
        // if the cart items itemId is not available in that case we will use setCartItems
        if (!cartItems[itemId]) {
            // and here we pass our previous cart data and we will return one object where we will define the itemId and its value while be 
            // one because this first time we add this item 
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        // now in else suppose any product item is already available and quantity is one in that case we will increase that 
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        // we will check if we have a token available 
        if (token) {
            // what every item is added in the cart we will update that in the database also
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
        setCartItems(prev => {
            if (prev[itemId] === 1) {
                // remove the item completely when count is 1
                const updated = { ...prev };
                delete updated[itemId];
                return updated;
            } else {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            }
        });
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        // here cartItems is an object so item is an object
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // in this find method we will pass one arrow function where we will get the product and wewill type product.id and here we will use the comparison and we will type item
                // so if our product.id i smatching with the item that is the key value of our cartitems it means this product is available in the cart 
                let itemInfo = food_list.find((product) => product._id === item);
                // in the case of item is in the cart we will add totalAmount and we will + is equal to itemInfo.price into quantity
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount;
    }

    // here to keep the number of items in cart at each item when we refresh the home page
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        // now we want to save that cartData that returned from response in a cartItems useState
        setCartItems(response.data.cartData);
    }

    // this function to still login even when we refresh the page and the fetchfoodlist function call
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [])

    // if we add any element in this object we can access that element in any component using the context
    const contextValue = {
        food_list,
        cartItems,
        url,
        token,
        setToken,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;