import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import WalkerNavBar from './WalkerNavBar'

const RequestForm = () => {
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/walkerongoingrequest')



    }
    return (
        <>
            < WalkerNavBar />
            <div>
                <h2>Request a Protector</h2>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    {
                        <div>
                            <label for="start-location">START:</label>
                            <input onChange={(e) => { setStart(e.target.value) }}type="text" id="start-location" /><br />
                            <label for="end-location">END:</label>
                            <input onChange={(e) => { setEnd(e.target.value) }}type="text" id="end-location"/><br />
                            <label for="message"></label>
                            <input onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder=""/><br />
                            <input type="submit" />
                        </div>                        
                    }
                </form>
            </div>
        </>
    )
}

export default RequestForm