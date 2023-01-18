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
        <div>
            < WalkerNavBar />
            <p> Meetup Location: {pastRequest.start_location}</p>
            <p>Destination : {pastRequest.end_location}</p>
            <p>Distance: {distance} </p>
            <p>Duration: {duration} </p>
            <p>Protector: Peter</p>
            {/* names should change dynamically */}
            <p>Walker: Lucy</p>
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
            <form>
                <label>Report Incident:</label>
                <textarea></textarea>
            </form>
        </div>
    ) : <></>
}


export default PastRequest