import ProtectorNavBar from './ProtectorNavBar'
import { useState, useEffect } from 'react'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from '@react-google-maps/api'

const libraries = ['places']

const OngoingRequest = () => {
    const [coords, setCoords] = useState({});
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [travelMode, setTravelMode] = useState('WALKING')
    const [instructions, setInstructions] = useState([])
    const [destination, setDestination] = useState('Penn Station, NY')


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })

    // const regex = /(<([^>]+)>)/gi

    useEffect(() => {

        const getLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    setCoords({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                });
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }
        if (isLoaded) {
            async function calculateRoute() {
                const directionsService = new google.maps.DirectionsService()
                directionsService.route({
                    origin: { lat: coords.lat, lng: coords.lng },
                    // waypoints: [{ location: 'Empire State Building' }],
                    // { lat: 40.751511, lng: -73.990150 }
                    destination: destination,
                    travelMode: google.maps.TravelMode[travelMode],
                }, (result, status) => {
                    if (status === 'OK') {
                        setDirectionsResponse(result);
                        setDistance(result.routes[0].legs[0].distance.text)
                        setDuration(result.routes[0].legs[0].duration.text)
                        setInstructions(result.routes[0].legs[0].steps.map((step, index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html: step.instructions }} />
                        )))
                    } else {
                        console.log('Directions request failed due to ' + status);
                    }
                });
            }
            calculateRoute()
        }
        getLocation()
    }, [isLoaded, travelMode, destination])


    const handleClick = () => {
        setDirectionsResponse(null)
        setDestination("Whitney Museum of American Art")
    }



    return isLoaded ? (
        <div>
            < ProtectorNavBar />
            <p> Meetup Location: Penn Station</p>
            <p>Distance: {distance} </p>
            <p>Duration: {duration} </p>
            <button onClick={() => { setTravelMode('WALKING') }}>Walking</button>
            <button onClick={() => { setTravelMode('TRANSIT') }}>Transit</button>
            <GoogleMap
                center={coords}
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
                <Marker position={coords} />
                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
            </GoogleMap>
            <div>{instructions}</div>
            <button onClick={() => { handleClick() }}>Meet with Walker, walk towards destination</button>
        </div>
    ) : <></>


}

export default OngoingRequest
