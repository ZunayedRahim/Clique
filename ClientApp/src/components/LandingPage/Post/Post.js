import "./post.css";
import { MoreVert, PostAddTwoTone } from "@material-ui/icons";
import profilepic from '../../../images/reaper.png';
import { useState } from "react";
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';
import { Link, useHistory } from 'react-router-dom'
import add from '../../../images/add.png';

export default function Post( post ) {
  const history=useHistory();
  
const gotologin = async (e) =>{
  e.preventDefault()
  history.push("/Signin");
 


}
  return (
      
    <div className="postLanding" >
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={profilepic}
              alt=""
            />
            <span className="postUsername">
              {post.title}
              
            </span>
            
          
          </div>
          <div className="postTopRight">
          
          </div>
      
        </div>
        <div className="postTopDownL" onClick={post.onClick}>
        <span className="postDateP"> {post.created_at}</span>
        <br/>
        <span className="postCommunityLanding">
              c/{post.community_name}
              
            </span>
        </div>
        
        <div className="postCenter" onClick={post.onClick}>
          <div className="postText"> {post.description}</div>
          <img className="postImg" src={post.imageURL} alt="" />
        </div>
         <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={upvote} alt="" />
            <span className="postLikeCounter">{post.upvote}</span>
            <img className="likeIcon" src={downvote}  alt=""/>
            <span className="postLikeCounter">{post.downvote}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentTextLanding"> comments</span>
          </div>
        </div> 
      </div>
    </div>
  );
}