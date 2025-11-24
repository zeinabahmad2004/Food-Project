import React, { useEffect, useState } from "react";
import './List.css'
import axios from "axios"
import { toast } from "react-toastify"

const List = ({ url }) => {
    // first we have to store all the data from the database into one state variable
    const [list, setList] = useState([]);
    // the url
    // const url = "http://localhost:4000"

    // after that we will create one fetch list function
    const fetchList = async () => {
        // here we will add API call
        // when we hit this API link we will get the response with the food items data
        const response = await axios.get(`${url}/api/food/list`);
        console.log(response.data);
        if (response.data.success) {
            setList(response.data.data);
        }
        else {
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    const removeFood = async (foodId) => {
        // here we do the API call
        // use the axios dot post method because we have created the remove food API using the post method
        // after the url parameter we have to pass one object where we will define id that will be foodId
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        // now we have to update the UI(user interface) with the new data
        // run the function we created 
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message)
        }
        else {
            toast.error("Error")
        }
    }
    return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format">
                            <img src={`${url}/images/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p className="cursor" onClick={() => removeFood(item._id)}>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default List