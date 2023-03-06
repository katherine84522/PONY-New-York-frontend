import React from "react";
import { NavLink } from "react-router-dom";
import HomeBtn from "./HomeBtn";


function WalkerNavBar() {
    return (
        <div className='flex bg-slate-100 bg-opacity-90 h-screen w-60 justify-center backdrop-grayscale'>
            <div>
                <ul className='font-semibold text-2xl text-slate-700 uppercase text-center'>
                    <li className="float-none">
                        <HomeBtn />
                    </li>
                    <li className="p-3 hover:text-blue-500">
                        <NavLink to="/requestform" exact>New Request</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-orange-400 border-0 rounded opacity-75" />
                    <li className="p-3 hover:text-blue-500">
                        <NavLink to="/walkerscheduledwalk" exact>My Schedule</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-orange-400 border-0 rounded opacity-75" />
                    <li className="p-3 hover:text-blue-500">
                        <NavLink to="/walkerhistory" exact>Walk History</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-orange-400 border-0 rounded opacity-75" />
                </ul>
            </div>
        </div>
    );
}

export default WalkerNavBar;