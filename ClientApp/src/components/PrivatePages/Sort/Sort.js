import React from 'react'
import "./sort.css";
import Post from "../Post/Post";
import New from '../../../images/sticker.png'
import Trend from '../../../images/trend.png'
import Top from '../../../images/arrow-up.png'
import Community from '../../../images/discussion.png'
import {  useHistory } from 'react-router-dom'
import { GET_AUTH } from "../../../api/api";



export default function Sort() {

    const [newposts, setNewPosts] = React.useState([]);
    const [topposts, setTopPosts] = React.useState([]);
    const history=useHistory();
    function createpost(){
        history.push("/SeeCommunities")

    }
    function gotocommunities(){
        history.push("/SeeCommunities")

    }

    const newClicked = async(e) => {
        e.preventDefault();
        const{ data} = await GET_AUTH("thread/privatethreadByNew")
        console.log(data);
        setNewPosts(data);


      
    }

    const topClicked = async(e) => {
        e.preventDefault();
        const{ data} = await GET_AUTH("thread/privatethreadByTop")
        console.log(data);
        setTopPosts(data);
    }
  return (


    




    <div className="share">
    <div className="shareWrapper">
      <div className="shareBottom">
          <div className="options">
              
              <div className="option">
              <img src={New} alt="" className="optionIcon" onClick={newClicked}/>
                  <span className="optionText">New</span>
              </div>
              <div className="option">
              <img src={Top} alt="" className="optionIcon" onClick={topClicked}/>
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