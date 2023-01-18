import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import WalkerNavBar from './WalkerNavBar'

const RequestForm = ({ setOngoingRequest, ongoingRequest }) => {
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [message, setMessage] = useState("")
    const [current, setCurrent] = useState(true)
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = useState(new Date().toISOString().slice(11, 16));
    const [showMessage, setShowMessage] = useState(false)

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
        let res = await req.json()



        if (current) {
            setShowMessage(true)
            setOngoingRequest(res)
            console.log(ongoingRequest)
        }
        else {
            navigate('/walkerscheduledwalk')
        }

    }

    const handleDatetime = (e) => {
        e.preventDefault()
    }




    return (
        <div className='flex bg-hero bg-cover'>
            <div className='text-left'>
            < WalkerNavBar />
            </div>
            <div className="flex justify-center items-center w-screen h-screen backdrop-blur-sm">
                {/* <form onSubmit={(e) => { handleDatetime(e) }}>
                    <label>Do you want a protector right now?</label><br />
                    <button onClick={() => { setCurrent(true) }} style={{ backgroundColor: current ? 'red' : 'white' }}>Yes</button><br />
                    <button onClick={() => { setCurrent(false) }} style={{ backgroundColor: current ? 'white' : 'red' }}>No, later</button><br />
                    {!current &&
                        <div>
                        <label>Select the date and time to meet up with the protector:</label><br />
                        <input type="date" min={new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 10)} max={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)} value={date} onChange={handleDateChange} /><br />
                        <input type="time" min={new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(11, 16)} max={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(11, 16)} value={time} onChange={handleTimeChange} /><br />
                        </div>
                        
                    }
                </form> */}
                <div className='flex justify-center items-center rounded-lg bg-slate-100 bg-opacity-75 w-3/5 h-3/5'>
                    <form className="rounded-md text-left" onSubmit={(e) => { handleSubmit(e) }}>
                        <h2 className='text-center font-semibold text-3xl uppercase text-slate-500'>Request a Protector</h2><br />
                        <label for="start-location">MEETUP LOCATION:</label><br />
                        <input className="h-8 w-96 rounded-md" onChange={(e) => { setStart(e.target.value) }} type="text" id="start-location" /><br />
                        <label for="end-location">DESTINATION:</label><br />
                        <input className='h-8 w-96 rounded-md' onChange={(e) => { setEnd(e.target.value) }} type="text" id="end-location" /><br />
                        <label>MESSAGE:</label><br />
                        <input className='h-28 w-96 rounded-md' onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder="" /><br />
                        <input className="mt-3 mr-3 p-2 bg-slate-500 text-slate-100 uppercase rounded-md" type="submit" />
                </form>
            </div>
        </div>
        </div>
    )
}

export default RequestForm