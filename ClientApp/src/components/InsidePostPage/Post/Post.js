import "./post.css";
import { MoreVert } from "@material-ui/icons";
import profilepic from '../../../images/reaper.png';
import add from '../../../images/add.png';
import { useState } from "react";
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';
import Comments from "../Comments/Comments";


export default function Post( post ) {
 
  
  return (
      
    <div className="post">
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
            />
          </div>
      
        </div>
        <div className="postTopDown">
        <span className="postCommunity">
              c/keeanureeves
              
            </span>
        </div>
        
        <div className="postCenter">
          <div className="postText"> 
          {post.description}
          </div>
          <img className="postImg" src={post.image} alt="" />
        </div>
         <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={upvote} alt="" />
            <span className="postLikeCounter">
            {post.upvote}
            </span>
            <img className="likeIcon" src={downvote}  alt=""/>
            <span className="postLikeCounter">{post.downvote}</span>
          </div>
         
        </div>
       
        <hr className="hrstyle"></hr>
  {/* <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={profilepic}
              alt=""
            />
            <span className="postUsername">
              {post.commentname} 
              
              
            </span>
            
            <span className="postDate"> 24 September,2021, 1:33pm</span>
          </div>
         
      
        
        </div>  */}
        {/* <div className="postCenter">
          <div className="postText">
           {post.comment} 
          
           </div>
         
        </div> */}

        <Comments/>
      </div>
    </div>
  );
}