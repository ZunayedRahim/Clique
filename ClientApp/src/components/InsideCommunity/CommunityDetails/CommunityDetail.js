import "./communitydetail.css";
import { MoreVert } from "@material-ui/icons";
import profilepic from '../../../images/reaper.png';
import { useState } from "react";
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';
import { Link, useHistory } from 'react-router-dom'
import add from '../../../images/plus_white.png';

export default function Community( community ) {
  const history=useHistory();
  const addtocommunity = async (e) =>{
    e.preventDefault()
    //history.push("/InsidePost");
   


}
  
  return (
      
    <div className="communityRoot">
      <div className="postWrapper">
        <div className="communityTop">
          <div className="postTopLeft">
            <img
              className="communityImage"
              src={profilepic}
              alt=""
            />
            <span className="communityTitle">
              {community.name}
              
            </span>
            
            
          </div>
          <div className="postTopRight">
          <img
              className="postProfileImg"
              src={add}
              alt=""
              onClick={addtocommunity}
            />
          </div>
      
        </div>
      
        
        <div className="postCenter">
          <div className="postText"> {community.description}</div>
         
        </div>
  
      </div>
    </div>
  );
}