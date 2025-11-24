import React, { useContext } from "react";
import './FoodDisplay.css'
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)
    return (
        <div className="food-display" id="food-display">
            <h2>Browse our menu and let your hunger guide you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    // here we say if category is all return all enter and return all items or if category equal to the item category enter and return just the condition
                    if (category === "All" || category === item.category) {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                })}
            </div>
        </div>
    )
}
export default FoodDisplay