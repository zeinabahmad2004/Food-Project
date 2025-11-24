import React from "react"
import './ExploreMenu.css'
import { menu_list } from "../../assets/assets"

const ExploreMenu = ({category,setCategory}) => {
    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Delicious Starts Here</h1>
            <p className="explore-menu-text">Hungry for something delicious? Our menu is packed with bold flavors, fresh meals, and your favorite comfort foods — all 
                ready to be delivered straight to your door.</p>
            <div className="explore-menu-div">
                {menu_list.map((item, index)=>{
                    return(
                        // in the setCategory first we will take our previous state and here we start our cheks(conditions)
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                            <img src={item.menu_image} alt="" className={category===item.menu_name ? "active" : ''}/>
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}
export default ExploreMenu