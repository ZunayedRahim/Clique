import React from 'react'
import Topbar from "../../src/components/Topbar";
import "./landingpage.css"
import Feed from "../../src/components/Feed";

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