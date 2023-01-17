import { useNavigate } from "react-router-dom";
// import { Dialog } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const Login = () => {
    const navigate = useNavigate()
    const [showProtector, setShowProtector] = useState(false)
    const [showWalker, setShowWalker] = useState(false)

    const handleProtector = () => {
        setShowProtector(true)
        // navigate(‘/protectorsignup’)
    }
    const handleWalker = () => {
        setShowWalker(true)
        // navigate(‘/walkersignup’)
    }

   

    return (
        <div>
        <div>
            <h1>Protectors of New York</h1>
        </div>
        <div className="group mt-8 flex gap-x-4 sm:justify-center">
            <button className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-800 hover:ring-indigo-800" onClick={() => { handleProtector() }}>Protector</button>
            <button className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-800 hover:ring-indigo-800" onClick={() => { handleWalker() }}>Walker</button>
        </div>
        </div>
    )
}

export default Login