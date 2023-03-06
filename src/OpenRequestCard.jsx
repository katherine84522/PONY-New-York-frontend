import { useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProtectorNavBar from './ProtectorNavBar'
import { io } from "socket.io-client";

const libraries = ['places']

const OpenRequestCard = ({ request, setOngoingRequest, coords }) => {

    const [duration, setDuration] = useState('')
    const [MTAduration, setMTADuration] = useState('')
    const [duration1, setDuration1] = useState('')

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })

    useEffect(() => {

        if (isLoaded) {
            async function calculateRoute() {
                const origin = coords && coords.lat && coords.lng ? new google.maps.LatLng({ lat: coords.lat, lng: coords.lng }) : null;
                const directionsService = new google.maps.DirectionsService()
                directionsService.route({
                    origin: origin,
                    destination: request.start_location,
                    travelMode: google.maps.TravelMode.WALKING,
                }, (result, status) => {
                    if (status === 'OK') {
                        setDuration(result.routes[0].legs[0].duration.text)
                    } else {
                        console.log('Directions request failed due to ' + status);
                    }
                });
                directionsService.route({
                    origin: origin,
                    destination: request.start_location,
                    travelMode: google.maps.TravelMode.TRANSIT,
                }, (result, status) => {
                    if (status === 'OK') {
                        setMTADuration(result.routes[0].legs[0].duration.text)
                    } else {
                        console.log('Directions request failed due to ' + status);
                    }
                });
                directionsService.route({
                    origin: request.start_location,
                    destination: request.end_location,
                    travelMode: google.maps.TravelMode.WALKING,
                }, (result, status) => {
                    if (status === 'OK') {
                        setDuration1(result.routes[0].legs[0].duration.text)
                    } else {
                        console.log('Directions request failed due to ' + status);
                    }
                });
            }
            calculateRoute()
        }

    }, [isLoaded])

    const navigate = useNavigate()

    const handleClick = async () => {
        if (request.current) {
            setOngoingRequest(request)
            let req = await fetch(`http://localhost:3000/requests/${request.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // protector_id: current_user //set it to the protector login
                    completed: false,
                    active: true
                })
            })
            let res = req.json()
            console.log(res)
            const socket = io("localhost:3000/");

            socket.emit("accept_request", (data) => {
                console.log('accept request- frontend');
            });
            navigate("/ongoingrequest")
        } else {
            navigate("/protectorscheduledwalk")
        }
    }


    return (
        <div className="">
            <div className='rounded-lg bg-slate-100 bg-opacity-80 w-3/5 h-3/5 px-6 pt-6 pb-16 hover:bg-slate-800 hover:bg-opacity-80 hover:text-white shadow-lg'>
                {request.current ? (<p className='text-indigo-500 text-2xl font-bold mb-4'>Current Request</p>) : (<p className='text-orange-400 text-2xl font-bold mb-4'>Future Request</p>)}
                <p className='font-bold'>Meetup Location: <b className='text-pink-600'>{request.start_location}</b></p>
                <p className='font-bold'> Time from your location:</p>
                <p className='font-bold'><b className='text-pink-600'>{duration}</b> by walk</p>
                <p className='font-bold'><b className='text-pink-600'>{MTAduration}</b> by subway</p>
                <p className='font-bold'>Destination: <b className='text-pink-600'>{request.end_location}</b></p>
                <p className='font-bold'>Trip Duration: <b className='text-pink-600'>{duration1}</b></p>
                <div>
                    <button className="p-2 bg-blue-500 hover:bg-blue-400 text-slate-100 uppercase rounded-md float-right" onClick={() => { handleClick() }}><b>Accept</b></button>
                </div>
            </div>
        </div>
    )
}


export default OpenRequestCard