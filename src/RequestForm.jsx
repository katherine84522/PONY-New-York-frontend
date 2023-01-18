import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import WalkerNavBar from './WalkerNavBar'

const RequestForm = () => {
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [message, setMessage] = useState("")
    const [current, setCurrent] = useState(true)
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = useState(new Date().toISOString().slice(11, 16));

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    }

    useEffect(() => {
        const selectedDate = new Date(`${date}T${time}`);
        const minDate = new Date(new Date().getTime() + 60 * 60 * 1000);
        const maxDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
        if (selectedDate < minDate) {
            setDate(minDate.toISOString().slice(0, 10));
            setTime(minDate.toISOString().slice(11, 16));
        }
        if (selectedDate > maxDate) {
            setDate(maxDate.toISOString().slice(0, 10));
            setTime(maxDate.toISOString().slice(11, 16));
        }
    }, [date, time]);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()


        let req = await fetch('http://localhost:3000/requests', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                start_location: start,
                end_location: end,
                walkee_id: 1,
                protector_id: 1,
                date,
                time,
                message,
                completed: false,
                current,
            }),
        })
        let res = req.json()
        console.log(res)

        navigate('/walkerongoingrequest')

    }

    const handleDatetime = (e) => {
        e.preventDefault()
    }





    return (
        <>
            < WalkerNavBar />
            <div>
                <h2>Request a Protector</h2>
                <form onSubmit={(e) => { handleDatetime(e) }}>
                    <label>Do you want a protector right now?</label>
                    <button onClick={() => { setCurrent(true) }} style={{ backgroundColor: current ? 'red' : 'white' }}>Yes</button>
                    <button onClick={() => { setCurrent(false) }} style={{ backgroundColor: current ? 'white' : 'red' }}>No, later</button>
                    {!current &&
                        <div>
                            <label>Select the date and time to meet up with the protector:</label><br />
                            <input type="date" min={new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 10)} max={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)} value={date} onChange={handleDateChange} />
                            <input type="time" min={new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(11, 16)} max={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(11, 16)} value={time} onChange={handleTimeChange} />
                        </div>

                    }
                </form>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <div>
                        <label for="start-location">Meetup Location:</label>
                        <input onChange={(e) => { setStart(e.target.value) }} type="text" id="start-location" /><br />
                        <label for="end-location">Destination:</label>
                        <input onChange={(e) => { setEnd(e.target.value) }} type="text" id="end-location" /><br />
                        <br /><label>Message:</label>
                        <input onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder="" /><br />
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default RequestForm