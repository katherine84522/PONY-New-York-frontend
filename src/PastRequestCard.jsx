import { useNavigate } from 'react-router-dom'

const PastRequestCard = ({ walk, setPastRequest, pastRequest }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        setPastRequest(walk)
        navigate('/pastrequest')
        console.log(pastRequest)
    }


    return (
        <div className='text-left rounded-lg bg-slate-100 bg-opacity-75 w-3/5 h-auto p-6 mt-3'>
            <p>Date: {walk.date}</p>
            <p>Protector: Katherine</p>
            <p>Meetup Location:{walk.start_location} </p>
            <p>Destination: {walk.end_location} </p>
            <button onClick={() => { handleClick() }}>Walk Details</button>
        </div>
    )
}

export default PastRequestCard