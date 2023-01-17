import ProtectorNavBar from './ProtectorNavBar'
import { useState, useEffect } from 'react'

const OngoingRequest = () => {
    const [coords, setCoords] = useState({});

    useEffect(() => {
        const getLocation = () => {
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
        getLocation()
    }, [])


    return (
        <div>
            < ProtectorNavBar />
            <p>Latitude: {coords.lat}</p>
            <p>Longitude: {coords.lng}</p>
        </div>
    );
}

export default OngoingRequest