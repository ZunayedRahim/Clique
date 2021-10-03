import "./postPrivate.css";
import add from '../../../images/add.png';
import { MoreVert } from "@material-ui/icons";
import profilepic from '../../../images/reaper.png';
import { useState } from "react";
import man from '../../../images/man.jpg';
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';


export default function Post( post ) {
  
  return (
      
    <div className="postPrivate">
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
            
            <span className="postDate"> 24 September,2021, 1:33pm</span>
          </div>
          <div className="postTopRight">
          <img
              className="postProfileImg"
              src={add}
              alt=""
              //onClick={gotologin}
            />
          </div>
      
        </div>
        <div className="postTopDown">
        <span className="postCommunity">
              c/keeanureeves
              
            </span>
        </div>
        
        <div className="postCenter">
          <div className="postText"> {post.description}</div>
          <img className="postImg" src={post.image} alt="" />
        </div>
         <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={upvote} alt="" />
            <span className="postLikeCounter">{post.upvote}</span>
            <img className="likeIcon" src={downvote}  alt=""/>
            <span className="postLikeCounter">{post.downvote}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div> 
      </div>
    </div>
  );
}