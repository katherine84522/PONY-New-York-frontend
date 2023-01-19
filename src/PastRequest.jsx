import WalkerNavBar from './WalkerNavBar'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from '@react-google-maps/api'
import { useEffect, useState } from 'react'


const libraries = ['places']

const PastRequest = ({ pastRequest }) => {

    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })


    useEffect(() => {
        if (isLoaded) {
            async function calculateRoute() {
                const directionsService = new google.maps.DirectionsService()
                directionsService.route({
                    origin: pastRequest.start_location,
                    destination: pastRequest.end_location,
                    travelMode: google.maps.TravelMode.WALKING,
                }, (result, status) => {
                    if (status === 'OK') {
                        setDirectionsResponse(result);
                        setDistance(result.routes[0].legs[0].distance.text)
                        setDuration(result.routes[0].legs[0].duration.text)
                    } else {
                        console.log('Directions request failed due to ' + status);
                    }
                });
            }
            calculateRoute()
        }
        console.log(pastRequest)
    }, [isLoaded])

    return isLoaded ? (
        <div className='flex w-screen h-screen'>
            < WalkerNavBar />
            <div className='flex justify-center items-center w-3/5 pl-52'>
            <div className='w-11/12 bg-slate-100 p-10 backdrop-blur-sm rounded-md bg-opacity-75'>
            <p className='font-bold'>Duration: <b className='text-pink-600'>{duration}</b></p>
            <p className='font-bold'>Distance: <b className='text-pink-600'>{distance}</b></p>
            <p className='font-bold'>Protector: <b className='text-pink-600'>Katherine</b></p>
            <p className='font-bold'>Meetup Location: <b className='text-pink-600'>{pastRequest.start_location}</b></p>
            <p className='font-bold'>Destination: <b className='text-pink-600'>{pastRequest.end_location} </b></p>
            <GoogleMap
                // center={coords}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '30vh' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    zoom: 13
                }}
                onLoad={map => {
                    const bounds = new window.google.maps.LatLngBounds();
                    map.fitBounds(bounds);
                }}
            >
                <Marker />
                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
            </GoogleMap>
            {/* <form>
                <label>Report Incident:</label>
                <textarea></textarea>
            </form> */}
            </div>
            </div>
        </div>
    ) : <></>
}


export default PastRequest