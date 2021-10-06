import "./post.css";
import { MoreVert } from "@material-ui/icons";
import profilepic from '../../../images/reaper.png';
import { useState } from "react";
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';
import man from '../../../images/man.jpg';
import { Link, useHistory } from 'react-router-dom'

export default function Post( post ) {
  const history=useHistory();

  console.log(post.imageURL+" Image loading?")
  
  
  return (
      
    <div className="postLanding" onClick={post.onClick}>
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
            <MoreVert />
          </div>
      
        </div>
        <div className="postTopDownCom">
        <span className="postDate">{post.created_at}</span>
        <br/>
        <span className="postCommunityCom">
              c/{post.community_name}
              
            </span>
        </div>
        
        <div className="postCenter">
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
            <span className="postCommentTextCom">comments</span>
          </div>
        </div> 
      </div>
    </div>
  );
}