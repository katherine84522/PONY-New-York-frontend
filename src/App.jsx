import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
// import './App.css'
import './index.css'
import Login from './Login'
import OngoingRequest from './OngoingRequest'
import OpenRequests from './OpenRequests'
import ProtectorSignup from './ProtectorSignup'
import RequestForm from './RequestForm'
import WalkerHistory from './WalkerHistory'
import WalkerSignup from './WalkerSignup'
import WalkerOngoing from './WalkerOngoing'
import ProtectorScheduledWalk from './ProtectorScheduledWalk'
import WalkerScheduledWalk from './WalkerScheduledWalk'
import PastRequest from './PastRequest'
import OpenRequestCard from './OpenRequestCard'

const App = () => {

  const [ongoingRequest, setOngoingRequest] = useState(null)
  const [pastRequest, setPastRequest] = useState(null)
  const [coords, setCoords] = useState({});

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
    getLocation()
  }, [])

  console.log(ongoingRequest)

  return (
    <div className="App bg-bridge">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/protectorsignup" element={<ProtectorSignup />} />
        <Route path="/ongoingrequest" element={<OngoingRequest ongoingRequest={ongoingRequest} coords={coords} />} />
        <Route path="/openrequests" element={<OpenRequests setOngoingRequest={setOngoingRequest} ongoingRequest={ongoingRequest} coords={coords} />} />
        <Route path="/protectorscheduledwalk" element={<ProtectorScheduledWalk />} />
        <Route path="/walkerscheduledwalk" element={<WalkerScheduledWalk />} />
        <Route path="/walkersignup" element={<WalkerSignup />} />
        <Route path="/requestform" element={<RequestForm />} />
        <Route path="/walkerhistory" element={<WalkerHistory setPastRequest={setPastRequest} pastRequest={pastRequest} />} />
        <Route path="/walkerongoingrequest" element={<WalkerOngoing />} />
        <Route path="/pastrequest" element={<PastRequest pastRequest={pastRequest} />} />
        <Route path="/openrequestcard" element={<OpenRequestCard setOngoingRequest={setOngoingRequest} />} />
      </Routes>
    </div>
  )
}

export default App
