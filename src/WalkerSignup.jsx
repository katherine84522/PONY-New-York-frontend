import { useNavigate } from "react-router-dom";
import { useState } from 'react'

const WalkerSignup = () => {


    const [formStep, setFormStep] = useState("contact")
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [picture, setPicture] = useState("")


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();


        const newWalker = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            picture: picture,
            phone_number: phone,
            gender_identity: gender,
        }

        const postWalker = async () => {
            let req = await fetch('http://127.0.0.1:3000/walkees', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newWalker)
            })
            let res = await req.json()
            console.log(res)

        }
        postWalker()
        navigate('/requestform')
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex backdrop-blur-sm justify-center items-center rounded-lg bg-slate-100 bg-opacity-50 w-3/5 h-3/5">
                <div>
                    <h2 className='font-semibold text-3xl uppercase text-slate-500'>Walker Signup Form</h2>
                    <form className="text-left" onSubmit={(e) => { handleSubmit(e) }}>
                        {
                            formStep === "contact" && <div className="w-96">
                                <h2 className='text-center font-semibold text-xl uppercase text-slate-700'>Login Info</h2>
                                <label className="p-1">FIRST NAME:</label>
                                <input className="h-8 w-96 rounded-md p-1" onChange={(e) => { setFirstName(e.target.value) }} type="text" placeholder="FIRST NAME" /><br />
                                <label className="p-1">LAST NAME:</label>
                                <input className="h-8 w-96 rounded-md p-1" onChange={(e) => { setLastName(e.target.value) }} type="text" placeholder="LAST NAME" /><br />
                                <label className="p-1">EMAIL:</label>
                                <input className="h-8 w-96 rounded-md p-1" onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="EMAIL" /><br />
                                <label className="p-1">PASSWORD:</label>
                                <input className="h-8 w-96 rounded-md p-1" onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="PASSWORD" /><br />
                                <button className="mt-3 mr-3 p-2 bg-slate-500 text-slate-100 float-right uppercase rounded-md" onClick={() => { setFormStep("personalData") }}>NEXT</button>
                            </div>
                        }
                        {
                            formStep === "personalData" && <div className="w-96">
                                <h2 className='text-center font-semibold text-xl uppercase text-slate-700'>Contact Info</h2>
                                <label className="uppercase">Phone Number:</label>
                                <input className="h-8 w-96 rounded-md p-1" onChange={(e) => { setPhone(e.target.value) }} type="tel" placeholder="000-000-0000" /><br />
                                <label className="uppercase">Photo:</label>
                                <input className="h-8 w-96 rounded-md p-1" onChange={(e) => { setPicture(e.target.value) }} type="text" /><br />
                                <select className="h-8 w-96 rounded-md mt-4 p-1" onChange={(e) => { setGender(e.target.value) }} type="text">
                                    <option value="" disabled selected>GENDER IDENTITY</option>
                                    <option>MALE</option>
                                    <option>FEMALE</option>
                                    <option>OTHER</option>
                                </select><br />
                                <br />
                                <button className="mt-3 mr-3 p-2 bg-slate-500 text-slate-100 uppercase rounded-md" onClick={() => { setFormStep("contact") }}>BACK</button>
                                <input className="mt-3 mr-3 p-2 bg-slate-500 text-slate-100 float-right uppercase rounded-md" type="submit" />
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default WalkerSignup