import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const ProtectorSignup = () => {
    const [protectors, setProtectors] = useState([])
    const [open, setOpen] = useState(false)
    const [formStep, setFormStep] = useState("contact")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const [selfie, setSelfie] = useState("")


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/openrequests')

        const newProtector = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            address: address,
            phone: phone,
            selfie: selfie,
            gender: gender,
        }

        const postProtector = async () => {
            let req = await fetch('http://localhost:3000/users/protectors', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProtector),
            })
            setProtectors((currentState) => {
                conslode.log("added!")
                return([...currentState, newProtector])
            })
        }
        postProtector()
    }

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div>
            <h2>Protector Signup Form</h2>
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
                        <input onChange={(e) => { setPhone(e.target.value)}} type="tel" placeholder="000-000-0000" /><br />
                        <input onChange={(e) => { setAddress(e.target.value)}} type="text" /><br />
                        <input onChange={(e) => { setSelfie(e.target.value)}} type="text" /><br />
                        <select onChange={(e) => { setGender(e.target.value)}} type="text">
                            <option value="" disabled selected>GENDER</option>
                            <option>MALE</option>
                            <option>FEMALE</option>
                        </select><br />
                        <input type="submit" />
                    </div>
                }               
            </form>
        </div>
    )
}

export default ProtectorSignup