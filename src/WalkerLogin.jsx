import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const WalkerLogin = () => {
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
        walkees.some(walkee => {
            if (walkee.email === formData.email && walkee.password === formData.password) {
                 setcurrentWalkee(walkee)
                // setLoggenIn(true)
                console.log("that is correct")
                navigate('/requestform')
            } else {
                console.log('chill daddy', currentWalkee)
            }
        })
        ;
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    return (
        <div className="flex justify-center items-center rounded-lg bg-slate-100 bg-opacity-75 w-96 h-96">
            <div onSubmit={(e) => { handleSubmit(e) }}>
                <h2 className="font-semibold text-xl text-center text-slate-500">WALKER</h2><br />
                <h2 className="font-semibold text-3xl text-center text-slate-500">LOG IN</h2><br />
                <form>
                    <input className="h-10 w-44 rounded-md text-center" type="email" value={formData.email} name='email' onChange={e =>  handleChange(e)} placeholder="EMAIL" /><br />
                    <input className="mt-3 w-44 h-10 rounded-md text-center" type="password" value={formData.password} name='password' onChange={e => handleChange(e)} placeholder="PASSWORD" /><br />
                    <div className="flex justify-center items-center">
                        <input className="mt-3 mr-3 p-2 bg-slate-500 hover:bg-orange-400 text-slate-100 uppercase rounded-md" type="submit" />
                        <button className="mt-3 p-2 bg-slate-500 hover:bg-orange-400 text-slate-100 rounded-md" onClick={() => { navigate('/walkersignup') }}>SIGN UP</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default WalkerLogin