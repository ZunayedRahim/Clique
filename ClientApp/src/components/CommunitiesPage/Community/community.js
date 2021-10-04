import "./community.css";
import { MoreVert } from "@material-ui/icons";
import profilepic from '../../../images/reaper.png';
import { useState } from "react";
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';
import { Link, useHistory } from 'react-router-dom'
import add from '../../../images/add.png';

export default function Community( post ) {
  const history=useHistory();
  const gotologin = async (e) =>{
    e.preventDefault()
    history.push("/Signin");
   


}
const gotocommunity = async (e) =>{
  e.preventDefault()
  history.push("/CommunityDetails");
 


}
console.log(post.image_Url+"Getting?");
  return (
      
    <div className="postLandingC" >
      <div className="postWrapper">
        <div className="postTopC">
          <div className="postTopLeft">
            <img
              className="postProfileImgC"
              src={post.image_Url}
              
              alt=""
            />
            <span className="postUsername">
              {post.title}
              
            </span>
            
            
          </div>
          <div className="postTopRight">
          <img
              className="addImg"
              src={add}
              alt=""
              onClick={gotologin}
            />
          </div>
      
        </div>
        <div className="postTopDownC" onClick={gotocommunity}>
        <span className="postCommunity">
              c/keeanureeves
              
            </span>
        </div>
        
        <div className="postCenter" onClick={gotocommunity}>
          <div className="postText"> {post.description}</div>
         
        </div>
         
      </div>
    </div>
  );
}