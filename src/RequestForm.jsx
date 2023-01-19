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
    const [showButton, setShowButton] = useState(false)
    const [showWait, setShowWait] = useState(false)

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
                active: false
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

    // const handleDatetime = (e) => {
    //     e.preventDefault()
    // }

    const handleCheck = async () => {
        let req = await fetch("http://localhost:3000/requests")
        let res = await req.json()
        const acceptedRequest = res.filter(accepted => { return accepted.active === true })
        if (acceptedRequest.length >= 1) {
            setShowButton(true)
            setShowWait(false)
        }
        else {
            setShowWait(true)
        }
        console.log(acceptedRequest)
    }


    const handleMeet = () => {
        navigate('/walkerongoingrequest')
    }



    return (
        <div className='flex bg-hero bg-cover'>
            <div className='text-left'>
                < WalkerNavBar />
            </div>
            <div className="flex justify-center items-center w-screen h-screen backdrop-blur-sm">
                <div className='flex-col justify-center items-center rounded-lg bg-slate-100 bg-opacity-75 w-3/5 p-10'>
                    <h2 className='text-center font-semibold text-3xl uppercase text-slate-500'>Request a Protector</h2><br />
                    <form className="rounded-md" onSubmit={(e) => { handleSubmit(e) }}>
                        <div className="text-center">
                            <label for="start-location ">MEETUP LOCATION:</label><br />
                            <input className="h-8 w-96 rounded-md" onChange={(e) => { setStart(e.target.value) }} type="text" id="start-location" /><br />
                            <label for="end-location">DESTINATION:</label><br />
                            <input className='h-8 w-96 rounded-md' onChange={(e) => { setEnd(e.target.value) }} type="text" id="end-location" /><br />
                            <label>MESSAGE:</label><br />
                            <input className='h-28 w-96 rounded-md' onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder="" /><br />
                            <div className="flex justify-center items-center">
                                <p className="mt-3 w-52 mr-3 p-2 bg-slate-500 text-slate-100 uppercase rounded-md" onClick={() => { setCurrent(!current) }}>{current ? "Schedule For Later" : "Schedule For Now"}</p><br />
                            </div>
                            {!current &&
                                <div className='p-3'>
                                    <label>Select the date and time to meet up with the protector:</label><br />
                                    <input type="date" min={new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 10)} max={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)} value={date} onChange={handleDateChange} />
                                    <input type="time" min={new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(11, 16)} max={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(11, 16)} value={time} onChange={handleTimeChange} /><br />
                                </div>
                            }
                            <input className="bg-orange-400 mt-3 mr-3 p-2 bg-slate-500 text-slate-100 uppercase rounded-md" type="submit" /><br />
                        </div>
                    </form>


                    {
                        showMessage &&
                        <div className="flex justify-center items-center mt-3">
                            <h2 className=" mt-3"> Request sent to protectors</h2>
                            <button className=" mt-3 ml-3 p-2 bg-slate-500 text-slate-100 uppercase rounded-md" onClick={() => { handleCheck() }}>Check Status</button>
                        </div>
                    }
                    {
                        showWait &&
                        <div role="alert" className=" mt-5">
                            <div class="border border-t-0 border-grey-400 rounded-b bg-red-100 px-4 py-3 text-red-700">

                                <button > Waiting for a Protector ...</button>
                            </div>
                        </div>
                    }
                    {
                        showButton &&
                        <div role="alert" className=" mt-5">
                            <div class="bg-orange-500 text-white font-bold rounded-t px-4 py-2">
                                A Protector accepted your walk request!
                            </div>
                            <div class="border border-t-0 border-orange-400 rounded-b bg-red-100 px-4 py-3 text-red-700">

                                <button onClick={() => { handleMeet() }}>Click here to meet with your Protector</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RequestForm