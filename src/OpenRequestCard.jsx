import { useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

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


    const handleClick = () => {
        if (request.current) {
            setOngoingRequest(request)
        }
    }


    return (
        <div>
            {/* <p>request.current? `Current Request: Future Request</p> */}
            <p>Meetup Location: Penn Station</p>
            <p>Your location to meetup location:<b>{duration}</b> by walk &nbsp; <b>{MTAduration}</b> by subway </p>
            <p>Destination: Whitney Museum of American Art</p>
            <p>Meetup Location to Destination: {duration1} by walk </p>
            <button onClick={() => { handleClick() }}>Accept Walk Request</button>
        </div>
    )
}


export default OpenRequestCard