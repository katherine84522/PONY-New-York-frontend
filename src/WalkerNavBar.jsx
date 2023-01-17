import React from "react";
import { NavLink } from "react-router-dom";


function WalkerNavBar() {
    return (
        <div className='navbar'>
            <div className='navButtons'>
                <NavLink to="/walkerongoingrequest" exact> Ongoing Request </NavLink>
                <NavLink to="/requestform" exact> Request </NavLink>
                <NavLink to="/walkerscheduledwalk" exact> Scheduled Walks </NavLink>
                <NavLink to="/walkerhistory" exact> Request History </NavLink>
            </div>
        </div>
    );
}

export default WalkerNavBar;