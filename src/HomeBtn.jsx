import { useNavigate } from "react-router-dom";
import { useState } from "react";


const HomeBtn = () => {
    const navigate = useNavigate()

    return(
        <div className="px-20 py-3">
            <div className="flex justify-center items-center rounded-full bg-slate-500 bg-opacity-75 w-20 h-20 hover:bg-slate-700" onClick={() => { navigate('/')}}>
                <img src="./pony-website-favicon-color.png" />
            </div>
        </div>
    )
}

export default HomeBtn