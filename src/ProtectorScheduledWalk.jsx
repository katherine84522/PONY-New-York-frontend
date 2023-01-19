import ProtectorNavBar from './ProtectorNavBar'
import { useEffect, useState } from 'react'

const ProtectorScheduledWalk = () => {
    const [scheduledWalks, setScheduledWalks] = useState([])

    useEffect(() => {
        const request = async () => {
            let req = await fetch('http://localhost:3000/requests')
            let res = await req.json()

            console.log(scheduledWalks)

            const renderedWalks = res.filter(walk => { return walk.current === false })
            setScheduledWalks(renderedWalks)
        }
        request()
    }, [])

    return (
        <div className='flex bg-hero bg-cover h-screen w-screen'>
            <div className='text-left'>
                < ProtectorNavBar />
            </div>
            <div className="flex-row pl-60 w-screen justify-center items-center p-10 backdrop-blur-sm">
                <h2 className='text-indigo-700 text-3xl font-bold bg-slate-100 bg-opacity-70 w-100 rounded-md'>Scheduled Walks</h2>
                {
                    scheduledWalks.map((walk) => {
                        return (
                            <div>
                                <div className='text-left rounded-lg bg-slate-100 bg-opacity-75 w-100 h-auto p-6 mt-3 ml-100'>
                                    <p className='font-bold'>Date: <b className='text-pink-600'>{walk.date}</b></p>
                                    <p className='font-bold'>Time: <b className='text-pink-600'>{walk.time}</b></p>
                                    <p className='font-bold'>Meetup Location: <b className='text-pink-600'>{walk.start_location}</b></p>
                                    <p className='font-bold'>Destination: <b className='text-pink-600'>{walk.end_location}</b></p>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )

}

export default ProtectorScheduledWalk