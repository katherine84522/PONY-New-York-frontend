import WalkerNavBar from './WalkerNavBar';
import { useEffect, useState } from 'react'

const WalkerScheduledWalk = () => {
    const [scheduledWalks, setScheduledWalks] = useState([])

    useEffect(() => {
        const request = async () => {
            let req = await fetch('http://localhost:3000/requests')
            let res = await req.json()

            const renderedWalks = res.filter(walk => { return walk.current === false })
            setScheduledWalks(renderedWalks)
            console.log(scheduledWalks)

        }
        request()
    }, [])


    return (
        <div>
            < WalkerNavBar />
            <h2>Scheduled Walk</h2>
            {
                scheduledWalks.map((walk) => {
                    return (
                        <div>
                            <p>date:{walk.date}</p>
                            <p>time: {walk.time}</p>
                            <p>Meetup Location: {walk.start_location}</p>
                            <p>Destination: {walk.end_location}</p>
                        </div>
                    )
                })

            }
        </div>
    )

}

export default WalkerScheduledWalk