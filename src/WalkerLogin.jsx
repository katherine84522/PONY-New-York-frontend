import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";

const WalkerLogin = ({ setIsWalkee, iswalkee }) => {
    const navigate = useNavigate()

    const [walkees, setWalkees] = useState([])
    const [currentWalkee, setcurrentWalkee] = useState([])
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        let request = async () => {
            let req = await fetch(`http://localhost:3000/walkees`)
            let res = await req.json()
            setWalkees(res)
        }
        request()
        console.log(walkees)
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        walkees.some(walkee => {
            if (walkee.email === formData.email && walkee.password === formData.password) {
                setcurrentWalkee(walkee)
                // setLoggenIn(true)
                const socket = io("localhost:3000/");
                socket.emit("walker_sid", (data) => {
                    console.log(data);
                });
                navigate('/requestform')
            } else {
                console.log('chill daddy', currentWalkee)
            }
        })
            ;
        setIsWalkee(true)
        console.log(iswalkee)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    return (
        <div className="flex justify-center items-center rounded-lg bg-slate-100 bg-opacity-75 w-96 h-96">
            <div onSubmit={(e) => { handleSubmit(e) }}>
                <h2 className="font-semibold text-xl text-center">WALKER</h2><br />
                <h2 className="font-semibold text-3xl text-center text-orange-500">LOG IN</h2><br />
                <form>
                    <input className="h-10 w-44 rounded-md text-center" type="email" value={formData.email} name='email' onChange={e => handleChange(e)} placeholder="EMAIL" /><br />
                    <input className="mt-3 w-44 h-10 rounded-md text-center" type="password" value={formData.password} name='password' onChange={e => handleChange(e)} placeholder="PASSWORD" /><br />
                    <div className="flex justify-center items-center">
                        <input className="mt-3 mr-3 p-2 bg-blue-500 hover:bg-blue-400 text-slate-100 uppercase rounded-md" type="submit" />
                        <button className="mt-3 p-2 bg-orange-400 hover:bg-orange-300 text-slate-100 rounded-md" onClick={() => { navigate('/walkersignup') }}>SIGN UP</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default WalkerLogin