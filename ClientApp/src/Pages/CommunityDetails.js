import React from 'react'

import Topbar from "../../src/components/InsideCommunity/Topbar/Topbar";
import "./communitydetails.css"

import Feed from "../../src/components/InsideCommunity/Feed/Feed";

export default function CommunitiyDetails() {
  return (
    <>
    <Topbar/>
    <div className="homeContainer">
        <Feed/> 
      </div>
  </>
    
  )
}