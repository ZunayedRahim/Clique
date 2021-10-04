import Post from "../Post/Post";
import React, { useEffect } from 'react'
import axios from "axios"
import "./feed.css";
import Grid from '@material-ui/core/Grid';
import { useParams } from "react-router";
import { PinDropSharp, PostAddSharp } from "@material-ui/icons";

export default function Feed(props) {
    const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

//   const req = async () => {
//     const response = await axios.get("https://localhost:5001/thread").then(
//         console.log("getting"))
//     console.log(response);
//     setPosts(response);
//   }
//   req()
const {id } =useParams();
console.log(id);
  useEffect(() => {
    setLoading(false);
    const exe = async () => {
      try {
        const{data} = await axios.get(`https://localhost:5001/thread/${id}`);
        console.log(data);
        
        setPosts(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    exe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }



  return (
    <div className="feed">
      <div className="feedWrapper">
      
      
               
                  <Post
                    
                    title= {posts.title}
                    description={posts.description}
                    upvote={posts.upvote}
                    downvote={posts.downvote}
                    
                    commentname="John wick"
                    comment="This is my first comment"
                    
                  />
                   
      </div>
    </div>
  );
}