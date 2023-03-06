import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const ProtectorSignup = () => {

    const [formStep, setFormStep] = useState("contact")
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const [picture, setPicture] = useState("")


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();


        const newProtector = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            address: address,
            phone_number: phone,
            picture: picture,
            gender_identity: gender,
            // active: active
        }

        const postProtector = async () => {
            let req = await fetch('http://localhost:3000/protectors', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProtector),
            })

        }
        postProtector()
        navigate('/openrequests')
    }



    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex backdrop-blur-sm justify-center items-center rounded-lg bg-slate-100 bg-opacity-60 w-2/5 h-3/5">
                <div>
                    <h2 className='font-semibold text-3xl uppercase mb-8'>Let's make NYC safer</h2>
                    <form className="text-left" onSubmit={(e) => { handleSubmit(e) }}>
                        {
                            formStep === "contact" && <div className="w-96">
                                <input className="h-8 w-80 rounded-md p-1 mb-4 ml-10" onChange={(e) => { setFirstName(e.target.value) }} type="text" placeholder="FIRST NAME" /><br />
                                <input className="h-8 w-80 rounded-md p-1 mb-4 ml-10" onChange={(e) => { setLastName(e.target.value) }} type="text" placeholder="LAST NAME" /><br />
                                <input className="h-8 w-80 rounded-md p-1 mb-4 ml-10" onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="EMAIL" /><br />
                                <input className="h-8 w-80 rounded-md p-1 mb-4 ml-10" onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="PASSWORD" /><br />
                                <button className="mt-3 mr-36 p-2 bg-orange-500 hover:bg-orange-400 text-slate-100 float-right uppercase rounded-md" onClick={() => { setFormStep("personalData") }}>NEXT</button>
                            </div>
                        }
                        {
                            formStep === "personalData" && <div className="w-96">
                                <input className="h-8 w-96 rounded-md p-1 mb-4" onChange={(e) => { setPhone(e.target.value) }} type="tel" placeholder="tel: 000-000-0000" /><br />
                                <input className="h-8 w-96 rounded-md p-1 mb-4" onChange={(e) => { setAddress(e.target.value) }} type="text" placeholder='Address' /><br />
                                <select className="h-8 w-96 rounded-md p-1" onChange={(e) => { setGender(e.target.value) }} type="text">
                                    <option value="" disabled selected>GENDER IDENTITY</option>
                                    <option>MALE</option>
                                    <option>FEMALE</option>
                                    <option>OTHER</option>
                                </select><br />
                                <br />
                                <button className="mt-3 mr-3 p-2 bg-orange-500 hover:bg-orange-400 text-slate-100 uppercase rounded-md" onClick={() => { setFormStep("contact") }}>BACK</button>
                                <input className="mt-3 mr-3 p-2 bg-blue-500 hover:bg-blue-400 text-slate-100 float-right uppercase rounded-md" type="submit" />
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProtectorSignup