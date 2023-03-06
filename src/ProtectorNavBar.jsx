import React from "react";
import { NavLink } from "react-router-dom";
import HomeBtn from "./HomeBtn";


function ProtectorNavBar() {
    return (
        <div className='bg-slate-100 bg-opacity-90 h-screen w-60 text-center backdrop-grayscale'>
            <div>
                <ul className='font-semibold text-2xl text-slate-700 uppercase'>
                    <li className="float-none">
                        <HomeBtn />
                    </li>
                    <li className="p-3 hover:text-blue-500">
                        <NavLink to="/openrequests" exact>all REQUESTS</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-orange-400 border-0 rounded opacity-75 dark:bg-slate-500" />
                    <li className="p-3 hover:text-blue-500">
                        <NavLink to="/protectorscheduledwalk" exact>My Schedule</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-orange-400 border-0 rounded opacity-75 dark:bg-slate-500" />
                </ul>
            </div>
        </div>
    );
}

export default ProtectorNavBar;