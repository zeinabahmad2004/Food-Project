import React from "react"
import './Sidebar.css'
import { IoMdAdd } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                {/* Creates a clickable link to /add, Adds an extra class like active when you're on /add */}
                <NavLink to='/add' className="sidebar-option">
                    <IoMdAdd className="add-option" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to='/list' className="sidebar-option">
                    <LuClipboardCheck className="order-icon" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to="/orders" className="sidebar-option">
                    <LuClipboardCheck className="order-icon" />
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}
export default Sidebar