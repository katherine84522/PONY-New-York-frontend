import React from "react";
import { NavLink } from "react-router-dom";


function ProtectorNavBar() {
    return (
        <div className='fixed top-0 left-0 h-screen w-30 m-0 flex flex-col bg-gray-900 text-white shadow-lg'>
                <NavLink  to="/openrequests" exact> Open Requests </NavLink>
                <NavLink to="/protectorscheduledwalk" exact> Scheduled Walks </NavLink>
                <NavLink to="/ongoingrequest" exact> Ongoing Request </NavLink>
            
        </div>
    );
}

export default ProtectorNavBar;