import { useState, useEffect } from 'react'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'

const libraries = ['places']

const WalkerOngoing = ({ ongoingRequest, coords }) => {
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [travelMode, setTravelMode] = useState('WALKING')
    const [instructions, setInstructions] = useState([])



    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })


    useEffect(() => {

        console.log(ongoingRequest)


        if (isLoaded) {
            async function calculateRoute() {
                const origin = coords && coords.lat && coords.lng ? new google.maps.LatLng({ lat: coords.lat, lng: coords.lng }) : null;
                const directionsService = new google.maps.DirectionsService()
                if (origin) {
                    directionsService.route({
                        origin: origin,
                        destination: ongoingRequest.end_location,
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
                } else { console.log(origin) }
            }
            calculateRoute()
        }

    }, [isLoaded, travelMode])


    const navigate = useNavigate()

    const handleComplete = () => {
        const request = async () => {
            let req = await fetch(`http://localhost:3000/requests/${ongoingRequest.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: true,
                    active: false
                })
            })
        }
        request()
        navigate('/requestform')

    }

    const handleCancel = () => {
        const request = async () => {
            let req = await fetch(`http://localhost:3000/requests/${ongoingRequest.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: false,
                    active: false
                })
            })
        }
        request()
        navigate('/requestform')
    }



    return isLoaded ? (
        <div>
            <p>Destination : {ongoingRequest.start_location}</p>
            <p>Distance: {distance} </p>
            <p>Duration: {duration} </p>
            <button onClick={() => { setTravelMode('WALKING') }} style={travelMode === 'WALKING' ? { color: 'orange' } : { color: 'white' }}>Walking</button>
            <button onClick={() => { setTravelMode('TRANSIT') }} style={travelMode === 'TRANSIT' ? { color: 'orange' } : { color: 'white' }}>Transit</button>
            <GoogleMap
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '50vh' }}
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
            <div>{instructions}</div>
            <button conClick={() => { handleComplete() }}>Walk Completed</button>
            <button conClick={() => { handleCancel() }}>Cancel Walk</button>
        </div>
    ) : <></>

}

export default WalkerOngoing