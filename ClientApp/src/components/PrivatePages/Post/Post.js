import "./postPrivate.css";
import add from '../../../images/add.png';
import { MoreVert } from "@material-ui/icons";
import profilepic from '../../../images/reaper.png';
import { useState } from "react";
import man from '../../../images/man.jpg';
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';
import { useParams } from "react-router";
import { GET, GET_AUTH, POST } from "../../../api/api";
import axios from "axios";
import React, { useEffect } from 'react'



export default function Post( post ) {
  const {id } =useParams();
  console.log(id);
  const [count, setCount] = useState(0);
  const [upvoteCount,setUpvoteCount] = useState('');
  const [downvoteCount,setDownvoteCount] = useState('');
  const [loading, setLoading] = React.useState(true);
 
  useEffect(() => {
    setLoading(false);
    const exe = async () => {
      try {
        const { data } = await GET_AUTH(`thread/addUpvote/${post.id}`);
        console.log(data);
        
        setUpvoteCount(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    exe();
  }, []);

  useEffect(() => {
    setLoading(false);
    const exe = async () => {
      try {
        const { data } = await GET_AUTH(`thread/addDownvote/${post.id}`);
        console.log(data);
        
        setDownvoteCount(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    exe();
  }, []);
  
 
//   const Getpostid = async (e) =>{
//     e.preventDefault()
    
//     const{data} = await axios.get(`https://localhost:5001/thread/${id}`);
//     console.log("id"+data);
    
    
 


// }



const OnClickUpvote = async() =>{
  // e.preventDefault();
  
console.log("inside upvote");
  console.log(post.id);
  // const{data} = await GET(`thread/addUpvote/${post.id}`);
  const{data} = await GET_AUTH(`thread/addUpvote/${post.id}`);
  console.log(data);
  setUpvoteCount(data);
  //setCount(data);

  
  

}


const OnClickDownvote = async(e) =>{
  // e.preventDefault();
  
console.log("inside downvote");
  console.log(post.id);
  // const{data} = await GET(`thread/addDownvote/${post.id}`);
  const{data} = await GET_AUTH(`thread/addDownvote/${post.id}`);
  console.log(data);
  setDownvoteCount(data);
 
  
}
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
            
           
          </div>
          <div className="postTopRight">
          
          </div>
      
        </div>
        <div className="postTopDownP">
       
        <span className="postDate"> {post.created_at}</span>
        <br/>
        <span className="postCommunityP">
              c/{post.community_name}
              
            </span>
        </div>
        
        <div className="postCenter" onClick={post.onClick}>
          <div className="postText"> {post.description}</div>
          <img className="postImg" src={post.imageURL} alt="" />
        </div>
         <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={upvote} alt="" onClick={OnClickUpvote}/>
            <span id="upvotespan" className="postLikeCounter">{upvoteCount}</span>
            <img className="likeIcon" src={downvote}  alt="" onClick = {OnClickDownvote}/>
            <span className="postLikeCounter">{downvoteCount}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div> 
      </div>
    </div>
  );
}