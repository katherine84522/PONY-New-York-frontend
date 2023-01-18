import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
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
    const socket = io("localhost:3000/");

    socket.on("connect", (data) => {
      console.log(data);
    });

    socket.on("data", (data) => {
      console.log(data);
    });

    socket.on("disconnect", (data) => {
      console.log(data);
    });

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

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
        <Route path="/requestform" element={<RequestForm setOngoingRequest={setOngoingRequest} ongoingRequest={ongoingRequest} />} />
        <Route path="/walkerhistory" element={<WalkerHistory setPastRequest={setPastRequest} pastRequest={pastRequest} />} />
        <Route path="/walkerongoingrequest" element={<WalkerOngoing ongoingRequest={ongoingRequest} coords={coords} />} />
        <Route path="/pastrequest" element={<PastRequest pastRequest={pastRequest} />} />
        <Route path="/openrequestcard" element={<OpenRequestCard setOngoingRequest={setOngoingRequest} />} />
      </Routes>
    </div>
  )
}

export default App
