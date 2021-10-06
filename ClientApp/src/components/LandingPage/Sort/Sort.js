import React from 'react'
import "./sort.css";
import New from '../../../images/sticker.png'
import Trend from '../../../images/trend.png'
import Top from '../../../images/arrow-up.png'
import {  useHistory } from 'react-router-dom'
import { GET, GET_AUTH } from "../../../api/api";

export default function Sort() {
    const history=useHistory();
    function createpost(){
        history.push("/SeeCommunities")

    }

    const [newposts, setNewPosts] = React.useState([]);
    const [topposts, setTopPosts] = React.useState([]);
   
    function createpost(){
        history.push("/SeeCommunities")

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
              <img src={New} alt="" className="optionIcon" />
                  <span className="optionText">New</span>
              </div>
              <div className="option">
              <img src={Top} alt="" className="optionIcon"/>
                  <span className="optionText">Top</span>
              </div>
              
          </div>
          <button className="addButton" onClick={createpost}>See Communities</button>
      </div>
    </div>
  </div>
  )
}