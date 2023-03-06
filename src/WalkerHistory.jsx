import WalkerNavBar from './WalkerNavBar'
import { useEffect, useState } from 'react'
import PastRequestCard from './PastRequestCard'

const WalkerHistory = ({ setPastRequest, pastRequest }) => {
    const [pastWalks, setPastWalks] = useState([])

    useEffect(() => {
        const request = async () => {
            let req = await fetch('http://localhost:3000/requests')
            let res = await req.json()

            const renderWalks = res.filter(walk => { return walk.completed === true })
            setPastWalks(renderWalks)
            console.log(renderWalks)

            // do a filter for only completed == true
        }
        request()
    }, [])

    return (
        <div className='flex bg-skyline bg-cover h-screen w-screen'>
            <div className='text-left'>
                < WalkerNavBar />
            </div>
            <div className=" flex-row pl-64 w-screen justify-center items-center p-10 backdrop-blur-sm overflow-auto">
                <h2 className='text-4xl font-bold text-white ml-36  w-50 rounded-md p-2 mb-5'>Walk History</h2>

                {
                    pastWalks.map((walk) => {
                        return (
                            <PastRequestCard walk={walk} setPastRequest={setPastRequest} pastRequest={pastRequest} />
                        )
                    })
                }
            </div>
        </div>
    )

}

export default WalkerHistory