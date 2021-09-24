import React from 'react'
import Topbar from "../../src/components/PrivatePages/Topbar/Topbar";
import "./privatepage.css"
import Feed from "../../src/components/PrivatePages/Feed/Feed";


export default function PrivatePage() {
  return (
    <>
    <Topbar/>
    <div className="homeContainer">
        <Feed/> 
      </div>
  </>
    
  )
}