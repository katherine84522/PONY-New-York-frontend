import ProtectorNavBar from './ProtectorNavBar'
import { useState, useEffect } from 'react'
import OpenRequestCard from './OpenRequestCard'

const OpenRequests = () => {

    const [requests, setRequests] = useState([])


    useEffect(() => {
        const request = async () => {
            let req = await fetch("http://localhost:3000/requests")
            let res = await req.json()
            console.log(res)
            setRequests(res)
        }
        request()
    }, [])

    return (
        <div className='flex flex-col bg-red-500'>
            <div>These are the open requests</div>
            < ProtectorNavBar />
            {
                requests.map((request) => {
                    return (
                        <div>
                            < OpenRequestCard request={request} />
                            < OpenRequestCard request={request} />
                        </div>
                    )
                })

            }
        </div>
    )
}

export default OpenRequests