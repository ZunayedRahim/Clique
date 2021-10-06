import "./communitydetail.css";
import { MoreVert } from "@material-ui/icons";
import profilepic from '../../../images/reaper.png';
import { useState } from "react";
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';
import { Link, useHistory } from 'react-router-dom'
import add from '../../../images/plus_white.png';
import post from '../../../images/writing.png';

export default function Community( community ) {
  const history=useHistory();
  console.log(community.id+" check");
  const addtocommunity = async (e) =>{
    e.preventDefault()
    


}

const postToCommunity = async (e) =>{
  e.preventDefault()
  window.location.href=`/NewPost/${community.id}`;


}
  
  return (
      
    <div className="communityRoot">
      <div className="postWrapper">
        <div className="communityTop">
          <div className="postTopLeft">
            <img
              className="communityImage"
              src={community.image_Url}
              alt=""
            />
            <span className="communityTitle">
              {community.name}
              
            </span>
            
            
          </div>
          <div className="postTopRight">
          <img
              className="img1"
              src={post}
              alt=""
              onClick={postToCommunity}
            />
          <img
              className="img2"
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