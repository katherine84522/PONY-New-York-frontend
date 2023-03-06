import { useNavigate } from "react-router-dom";
import { useState } from "react";


const HomeBtn = () => {
    const navigate = useNavigate()

    return (
        <div className=" py-3">
            <div className="flex justify-center items-center bg-opacity-75 ml-8 mr-8 mt-12 mb-12 w-40 h-20" onClick={() => { navigate('/') }}>
                <img src="./logo-no-background.png" />
            </div>
        </div>
    )
}

export default HomeBtn