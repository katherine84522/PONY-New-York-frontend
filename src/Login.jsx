import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectorSignup from "./ProtectorSignup";
import ProtectorLogin from "./ProtectorLogin"
import WalkerLogin from "./WalkerLogin"
// import { Dialog } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const Login = () => {
    const navigate = useNavigate()
    const [showProtector, setShowProtector] = useState(false)
    const [showWalker, setShowWalker] = useState(false)

    const handleProtector = () => {
        setShowProtector(true)
        setShowWalker(false)
        // navigate(‘/protectorsignup’)
    }
    const handleWalker = () => {
        setShowWalker(true)
        setShowProtector(false)
        // navigate(‘/walkersignup’)
    }

   

    return (
        <div className="">
            <div className="bg-gradient-to-r from-slate-800 to-transparent h-44 flex justify-center items-center">
                <h1 className="font-sans text-slate-200 font-extrabold text-center text-6xl" >Protectors of New York</h1>
        </div>
            <div className="flex w-screen h-screen gap-x-96 justify-center items-center">
                {showProtector === true ? 
                    <ProtectorLogin />
                    // pony video lol
                    // <div className="justify-center items-center">
                    // <section className="h-96 w-96">
                    //     <div className="video-docker absolute w-96 h-96 overflow-hidden">
                    //         <video className="min-w-full min-h-full absolute object-cover" src="/20141205_Ginuwine - Pony.mp4" type="video/mp4" autoPlay loop></video>
                    //     </div>
                    // </section>
                    // </div> 
                    :
                <div onClick={() => { handleProtector() } } className="flex justify-center items-center rounded-full bg-slate-500 bg-opacity-75 w-96 h-96 shadow-lg ring-8 ring-transparent hover:ring-indigo-500">
                    <h2 className="text-slate-100 text-4xl font-semibold">Protector</h2>
            </div> 
                }

                {showWalker === true ? 
                    <WalkerLogin /> :
                <div onClick={() => { handleWalker() } } className="flex justify-center items-center rounded-full bg-slate-500 bg-opacity-75 w-96 h-96 ring-8 ring-transparent hover:ring-indigo-500">
                    <h2 className="text-slate-100 text-4xl font-semibold">Walker</h2>
                </div>
                }
        </div>
        </div>
    )
}

export default Login