import WalkerNavBar from './WalkerNavBar'
import { useEffect, useState } from 'react'
import PastRequestCard from './PastRequestCard'

const WalkerHistory = ({ setPastRequest, pastRequest }) => {
    const [pastWalks, setPastWalks] = useState([])

    useEffect(() => {
        const request = async () => {
            let req = await fetch('http://localhost:3000/requests')
            let res = await req.json()
            setPastWalks(res)
            console.log(pastWalks)
            // do a filter for only completed == true
        }
        request()
    }, [])

    return (
        <>
            < WalkerNavBar />
            <div>
                <h2>Past Requests</h2>
                {
                    pastWalks.map((walk) => {
                        return (
                            <PastRequestCard walk={walk} setPastRequest={setPastRequest} pastRequest={pastRequest} />
                        )
                    })
                }
            </div>
        </>
    )

}

export default WalkerHistory