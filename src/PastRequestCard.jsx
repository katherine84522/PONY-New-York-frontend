import { useNavigate } from 'react-router-dom'

const PastRequestCard = ({ walk, setPastRequest, pastRequest }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        setPastRequest(walk)
        navigate('/pastrequest')
        console.log(pastRequest)
    }


    return (
        <div>
            <div className='rounded-lg bg-slate-100 bg-opacity-80 w-3/5 h-3/5 px-6 pt-6 pb-16 my-3'>
                <p className='font-bold'>Date: <b className='text-pink-600'>{walk.date}</b></p>
                {/* <p className='font-bold'>Protector:<b className='text-pink-600'></b></p> */}
                <p className='font-bold'>Meetup Location: <b className='text-pink-600'>{walk.start_location}</b></p>
                <p className='font-bold'>Destination: <b className='text-pink-600'>{walk.end_location} </b></p>
                <div>
                    <button className="p-2 mt-2 bg-slate-500 hover:bg-orange-400 text-slate-100 uppercase rounded-md float-right" onClick={() => { handleClick() }}>Walk Details</button>
                </div>
            </div>
        </div>
    )
}

export default PastRequestCard