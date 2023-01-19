import { useNavigate } from "react-router-dom";
import { useState } from 'react'

const WalkerUpdate = () => {

    const [formStep, setFormStep] = useState("contact")
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [picture, setPicture] = useState("")


    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault();


        const newWalkerInfo = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            picture: picture,
            phone_number: phone,
            gender_identity: gender,
        }

        const changeWalker = async () => {
            let req = await fetch('http://127.0.0.1:3000/walkees', {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newWalkerInfo)
            })
            let res = await req.json()
            console.log(res)

        }
        changeWalker()
        navigate('/requestform')
    }


    return (
        <div>
            <h2>UPDATE INFO</h2>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                {
                    <div>
                        <h2>Update Login Info</h2>                        
                        <input className="input-field" onChange={(e) => { setFirstName(e.target.value) }} type="text" placeholder="FIRST NAME" /><br />
                        <input className="input-field" onChange={(e) => { setLastName(e.target.value) }} type="text" placeholder="LAST NAME" /><br />
                        <input className="input-field" onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="EMAIL" /><br />
                        <input className="input-field" onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="NEW PASSWORD" /><br />                        
                    </div>
                }
                {
                    <div>                        
                        <h2>Update Personal & Contact Info</h2>
                        <label>Phone Number:</label>
                        <input onChange={(e) => { setPhone(e.target.value) }} type="tel" placeholder="000-000-0000" /><br />
                        <label>Change Profile Photo:</label>
                        <input onChange={(e) => { setPicture(e.target.value) }} type="text" /><br />
                        <label>Gender Identity:</label>
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

export default WalkerUpdate