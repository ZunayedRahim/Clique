import React from 'react'
import Topbar from "../../src/components/InsidePostPage/Topbar/Topbar";
import Feed from '../../src/components/InsidePostPage/Feed/Feed';
import "./insidepost.css"



export default function InsidePost() {
  return (
    <>
    <Topbar/>
    <div className="homeContainer">
        <Feed/>
      </div>
  </>
    
  )
}