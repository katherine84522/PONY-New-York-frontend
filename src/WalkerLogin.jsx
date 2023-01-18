import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const WalkerLogin = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/requestform')
    }

    return (
        <div className="flex justify-center items-center rounded-lg bg-slate-100 bg-opacity-75 w-96 h-96">
            <div onSubmit={(e) => { handleSubmit(e) }}>
                <h2 className="font-semibold text-xl text-center text-slate-500">WALKER</h2><br />
                <h2 className="font-semibold text-3xl text-center text-slate-500">LOG IN</h2><br />
                <form>
                    <input className="h-10 w-44 rounded-md text-center" onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="EMAIL" /><br />
                    <input className="mt-3 w-44 h-10 rounded-md text-center" onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="PASSWORD" /><br />
                    <div className="flex justify-center items-center">
                        <input className="mt-3 mr-3 p-2 bg-slate-500 text-slate-100 uppercase rounded-md" type="submit" />
                        <button className="mt-3 p-2 bg-slate-500 text-slate-100 rounded-md" onClick={() => { navigate('/walkersignup') }}>SIGN UP</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default WalkerLogin