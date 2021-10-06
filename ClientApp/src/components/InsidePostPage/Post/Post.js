import "./post.css";
import { MoreVert, PostAddSharp } from "@material-ui/icons";
import profilepic from '../../../images/reaper.png';
import add from '../../../images/add.png';
import { useState } from "react";
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';
import Comments from "../Comments/CreateComment";
import { Button, TextareaAutosize, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { GET, GET_AUTH, POST } from "../../../api/api";

const useStyles = makeStyles((theme) => ({
    
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#000000",
    color: "white",
    height: 50,
    borderRadius: 10,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#000000',
    '&:hover' : {
      color: "red",
      backgroundColor: "#000000",
      borderColor: "red",
    }

  }
}));

export default function Post( post ) {
  const classes = useStyles();
  const [werty,qwertyuhjk] = useState('');
  const [loading, setLoading] = useState(true);
  const [up,setUp] = useState('');
  const [down,setDown] = useState('');

  console.log(post.id);


  useEffect(() => {
    setLoading(false);
    const exe = async () => {
      try {
        const { data } = await GET_AUTH(`thread/addUpvote/${post.id}`);
        console.log(data);
        console.log(post.id);
        setUp(data);
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
        
        setDown(data);
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
  setUp(data);
  //setCount(data);

  
  

}


const OnClickDownvote = async(e) =>{
  // e.preventDefault();
  
console.log("inside downvote");
  console.log(post.id);
  // const{data} = await GET(`thread/addDownvote/${post.id}`);
  const{data} = await GET_AUTH(`thread/addDownvote/${post.id}`);
  console.log(data);
  setDown(data);
 
  
}
  

  return (
      
    <div className="postSingle">
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
            
            <span className="postDate"> {post.created_at}</span>
          </div>
          <div className="postTopRight">
          
          </div>
      
        </div>
        <div className="postTopDown">
        <span className="postCommunity">
              c/{post.community_name}
              
            </span>
        </div>
        
        <div className="postCenter">
          <div className="postText"> 
          {post.description}
          </div>
          <img className="postImg" src={post.imageURL} alt="" onClick={OnClickUpvote}/>
        </div>
         <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={upvote} alt="" onClick={OnClickDownvote}/>
            <span className="postLikeCounter">
            {up}
            </span>
            <img className="likeIcon" src={downvote}  alt=""/>
            <span className="postLikeCounter">{down}</span>
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

 
        
      </div>
    </div>
  );
}