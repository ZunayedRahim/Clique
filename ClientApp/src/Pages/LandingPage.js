import React from 'react'

import Topbar from "../../src/components/LandingPage/Topbar/Topbar";
import "./landingpage.css"
import Feed from "../../src/components/LandingPage/Feed/Feed";

export default function LandingPage() {
  return (
    <>
    <Topbar/>
    <div className="homeContainer">
        <Feed/> 
      </div>
  </>
    
  )
}