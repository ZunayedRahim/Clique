import React from 'react'

import Topbar from "../../src/components/CommunitiesPage/Topbar/Topbar";
import "./seecommunities.css"

import Feed from "../../src/components/CommunitiesPage/Feed/Feed";

export default function SeeCommunities() {
  return (
    <>
    <Topbar/>
    <div className="homeContainer">
        <Feed/> 
      </div>
  </>
    
  )
}