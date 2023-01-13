import React from "react";
import { NavLink } from "react-router-dom";


function ProtectorNavBar() {
    return (
        <div className='navbar'>
            <div className='navButtons'>
                <NavLink to="/openrequests" exact> Open Requests </NavLink>
                <NavLink to="/schedule" exact> Schedule </NavLink>
                <NavLink to="/ongoingrequest" exact> Ongoing Request </NavLink>
            </div>
        </div>
    );
}

export default ProtectorNavBar;