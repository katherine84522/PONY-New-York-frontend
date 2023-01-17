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
        navigate('/requestform')

        const newWalker = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            // password,
            // picture,
            // phone,
            // gender_identity: gender,
        }

        const postWalker = async () => {
            let req = await fetch('http://127.0.0.1:5000/walkees', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newWalker)
            })

        }
        postWalker()
    }


    return (
        <div>
            <h2>Walker Signup Form</h2>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                {
                    formStep === "contact" && <div>
                        <h2>Contact Info</h2>
                        <input className="input-field" onChange={(e) => { setFirstName(e.target.value) }} type="text" placeholder="FIRST NAME" /><br />
                        <input className="input-field" onChange={(e) => { setLastName(e.target.value) }} type="text" placeholder="LAST NAME" /><br />
                        <input className="input-field" onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="EMAIL" /><br />
                        <input className="input-field" onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="NEW PASSWORD" /><br />
                        <button onClick={() => { setFormStep("personalData") }}>NEXT</button>
                    </div>
                }
                {
                    formStep === "personalData" && <div>
                        <button onClick={() => { setFormStep("contact") }}>BACK</button><br />
                        <label>Phone Number:</label>
                        <input onChange={(e) => { setPhone(e.target.value) }} type="tel" placeholder="000-000-0000" /><br />
                        <label>Photo:</label>
                        <input onChange={(e) => { setPicture(e.target.value) }} type="text" /><br />
                        <select onChange={(e) => { setGender(e.target.value) }} type="text">
                            <option value="" disabled selected>GENDER</option>
                            <option>MALE</option>
                            <option>FEMALE</option>
                            <option>OTHER</option>
                        </select><br />
                        <input type="submit" />
                    </div>
                }
            </form>
        </div>
    )
}

export default WalkerSignup