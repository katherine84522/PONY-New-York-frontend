import { useState } from 'react'
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
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/protectorsignup" element={<ProtectorSignup />} />
        <Route path="/ongoingrequest" element={<OngoingRequest />} />
        <Route path="/openrequests" element={<OpenRequests />} />
        <Route path="/protectorscheduledwalk" element={<ProtectorScheduledWalk />} />
        <Route path="/walkerscheduledwalk" element={<WalkerScheduledWalk />} />
        <Route path="/walkersignup" element={<WalkerSignup />} />
        <Route path="/requestform" element={<RequestForm />} />
        <Route path="/walkerhistory" element={<WalkerHistory />} />
        <Route path="/walkerongoingrequest" element={<WalkerOngoing />} />
        <Route path="/pastrequest" element={<PastRequest />} />
        <Route path="/openrequestcard" element={<OpenRequestCard />} />
      </Routes>
    </div>
  )
}

export default App
