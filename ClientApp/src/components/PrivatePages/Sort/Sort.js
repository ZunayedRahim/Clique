import React from 'react'
import "./sort.css";
import New from '../../../images/sticker.png'
import Trend from '../../../images/trend.png'
import Top from '../../../images/arrow-up.png'
import Community from '../../../images/discussion.png'
import {  useHistory } from 'react-router-dom'


export default function Sort() {
    const history=useHistory();
    function createpost(){
        history.push("/NewPost")

    }
    function gotocommunities(){
        history.push("/SeeCommunities")

    }
  return (
    <div className="share">
    <div className="shareWrapper">
      <div className="shareBottom">
          <div className="options">
              <div className="option"> 
                  <img src={Trend} alt="" className="optionIcon"/>
                  <span className="optionText">Trending</span>
              </div>
              <div className="option">
              <img src={New} alt="" className="optionIcon"/>
                  <span className="optionText">New</span>
              </div>
              <div className="option">
              <img src={Top} alt="" className="optionIcon"/>
                  <span className="optionText">Top</span>
              </div>
              <div className="option">
              <img src={Community} alt="" className="optionIcon"/>
                  <span className="optionText" onClick={gotocommunities}>Communities</span>
              </div>
              
          </div>
          <button className="addButton" onClick={createpost}>Post Something</button>
      </div>
      
    </div>
  </div>
  )
}