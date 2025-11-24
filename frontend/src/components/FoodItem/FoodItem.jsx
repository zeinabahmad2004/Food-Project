import React, { useContext } from "react";
import './FoodItem.css'
import { MdStarRate } from "react-icons/md";
import { MdOutlineStarRate } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);


    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <div className="image-container">
                    <img className="food-item-image" src={url + "/images/" + image} alt="" />
                </div>
                {
                    !cartItems[id]
                        ? <IoIosAdd className="add" onClick={() => addToCart(id)} />
                        : <div className="food-item-counter">
                            <IoMdRemove className="remove-icon" onClick={() => removeFromCart(id)} />
                            <p>{cartItems[id]}</p>
                            <IoIosAdd className="add-icon" onClick={() => addToCart(id)} />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <div className="rating">
                        <MdStarRate />
                        <MdStarRate />
                        <MdStarRate />
                        <MdStarRate />
                        <MdOutlineStarRate />
                    </div>
                </div>
                <p className="food-item-desc">
                    {description}
                </p>
                <p className="food-item-price">
                    ${price}
                </p>
            </div>
        </div>
    )
}
export default FoodItem