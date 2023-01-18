import React from "react";
import { NavLink } from "react-router-dom";


function WalkerNavBar() {
    return (
        <div className='bg-slate-100 bg-opacity-75 h-screen w-52 text-center backdrop-grayscale'>
            <div>
                <ul className='font-semibold pt-14 text-2xl text-slate-700 uppercase'>
                    <hr className="w-48 h-1 mx-auto my-1 bg-slate-100 border-0 rounded opacity-75 dark:bg-slate-500" />
                    <li className="p-3">
                        <NavLink to="/requestform" exact>New Request</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-slate-100 border-0 rounded opacity-75 dark:bg-slate-500" />
                    <li className="p-3">
                        <NavLink to="/walkerscheduledwalk" exact>My Schedule</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-slate-100 border-0 rounded opacity-75 dark:bg-slate-500" />
                    <li className="p-3">
                        <NavLink to="/walkerhistory" exact>Walk History</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-slate-100 border-0 rounded opacity-75 dark:bg-slate-500" />
                </ul>
            </div>
        </div>
    );
}

export default WalkerNavBar;