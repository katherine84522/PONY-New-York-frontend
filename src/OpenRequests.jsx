import ProtectorNavBar from './ProtectorNavBar'
import { useState, useEffect } from 'react'
import OpenRequestCard from './OpenRequestCard'
import { useNavigate } from 'react-router-dom'


const OpenRequests = ({ setOngoingRequest, ongoingRequest, coords }) => {

    const [requests, setRequests] = useState([])

    useEffect(() => {
        const request = async () => {
            let req = await fetch(`http://localhost:3000/requests`)
            let res = await req.json()
            const notCompletedRequests = res.filter(request => { return request.completed === false })
            setRequests(notCompletedRequests)

        }
        request();
    }, []);

    const navigate = useNavigate()
    useEffect(() => {

        if (ongoingRequest) {
            if (ongoingRequest.current) {
                navigate('/OngoingRequest')
            } else {
                navigate('/protectorscheduledwalk')
            }
        }

    }, [ongoingRequest])

    return (
        <div className='flex flex-col bg-red-500'>
            {/* < ProtectorNavBar /> */}
            {
                requests.map((request, i) => {
                    return (
                        <div>
                            < OpenRequestCard key={`ongoing-request-${i}`} request={request} setOngoingRequest={setOngoingRequest} ongoingRequest={ongoingRequest} coords={coords} />
                        </div>
                    )
                })

            }
        </div>
    )
}

export default OpenRequests