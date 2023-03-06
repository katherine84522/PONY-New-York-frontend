import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectorSignup from "./ProtectorSignup";
import ProtectorLogin from "./ProtectorLogin"
import WalkerLogin from "./WalkerLogin"
import HomeBtn from "./HomeBtn";
// import { Dialog } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const Login = ({ setIsWalkee, iswalkee }) => {
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
            <div>
                <HomeBtn />
            </div>
            <div className="flex gap-x-72 justify-center items-center" style={{ height: '100%' }}>
                {showProtector === true ?
                    <ProtectorLogin />
                    :
                    <div onClick={() => { handleProtector() }} className="flex justify-center items-center rounded-full bg-slate-100 backdrop-grayscale bg-opacity-80 w-96 h-96 shadow-lg text-indigo-500 hover:bg-slate-800 hover:bg-opacity-90">
                        <h2 className="font-semibold" style={{ fontSize: '38px' }}>PROTECTOR</h2>
                    </div>
                }

                {showWalker === true ?
                    <WalkerLogin setIsWalkee={setIsWalkee} iswalkee={iswalkee} /> :
                    <div onClick={() => { handleWalker() }} className="flex justify-center items-center rounded-full bg-slate-100 backdrop-grayscale bg-opacity-80 w-96 h-96 text-orange-500 hover:bg-slate-800 hover:bg-opacity-90">
                        <h2 className="font-semibold" style={{ fontSize: '38px' }}>WALKER</h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default Login