import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import WalkerNavBar from './WalkerNavBar'

const RequestForm = () => {
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [message, setMessage] = useState("")
    const [future, setFuture] = useState(false)
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

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/walkerongoingrequest')

        // post request

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
                    <button onClick={() => { setFuture(false) }}>Yes</button>
                    <button onClick={() => { setFuture(true) }}>No, later</button>
                    {future &&
                        <div>
                            <label>Select the date and time to meet up with the protector:</label><br />
                            <input type="date" min={new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 10)} max={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)} value={date} onChange={handleDateChange} />
                            <input type="time" min={new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(11, 16)} max={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(11, 16)} value={time} onChange={handleTimeChange} />
                        </div>

                    }
                </form>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <div>
                        <label for="start-location">START:</label>
                        <input onChange={(e) => { setStart(e.target.value) }} type="text" id="start-location" /><br />
                        <label for="end-location">END:</label>
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