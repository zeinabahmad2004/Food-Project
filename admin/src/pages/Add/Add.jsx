import React, { useState } from "react";
import './Add.css'
import { assets } from "../../assets/assets";
import axios from "axios"
import { toast } from "react-toastify";

const Add = ({ url }) => {
    // const url = "http://localhost:4000";

    // so now we will store that image for that we will create one state variable
    const [image, setImage] = useState(false);
    // then we have to create one object where we will store the product name, description, category, and product price
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        // so that whenever we will reload the web page our default category will be salad
        category: "Salad",
    })
    // onChange handler function
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // here we set the previous data + the update
        setData(data => ({ ...data, [name]: value }))
    }

    // now we can to do the API 
    // to make the API call we will create one onSubmit handler function
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // now we have to insert all the form data which is the image and these name, description price category in one form data
        const formData = new FormData();
        // in the append we add the field name
        formData.append("name", data.name);
        formData.append("description", data.description);
        // we have here in frontend stored this price as a string and we have defined the price as a number in backend and so we have to convert this value in the number 
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        // next we have to send this form data on our endpoint
        // now we will do the API call we will use the axios 
        // in this response we while store the response from the server in this axios we add use post because we have created the add API using the post method
        // in this method we give the endpoint where we will upload the product, and the formData
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            // if the response is success we have to reset the form field values
            setData({
                name: "",
                description: "",
                price: "",
                // so that whenever we will reload the web page our default category will be salad
                category: "Salad",
            })
            setImage(false);
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        {/* to create a preview(when we add the image) within this src we will  add ternary operator */}
                        <img src={image ? URL.createObjectURL(image) : assets.file_upload} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    {/* we will convert this input field in the controlled input field it means when we change anything in this input field that will be updated inn this state variable*/}
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$20" />
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    )
}
export default Add