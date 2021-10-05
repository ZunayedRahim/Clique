import Post from "../Post/Post";
import React, { useEffect } from 'react'
import axios from "axios"
import "./feed.css";
import Grid from '@material-ui/core/Grid';
import CommunityDetail from "../CommunityDetails/CommunityDetail";
import { useParams } from "react-router";
import { GET } from '../../../api/api'

export default function Feed() {
    const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [community, setCommunity] = React.useState([]);
//   const req = async () => {
//     const response = await axios.get("https://localhost:5001/thread").then(
//         console.log("getting"))
//     console.log(response);
//     setPosts(response);
//   }
//   req()

const { id } =useParams();
console.log(id);
// console.log(props.id);
  useEffect(() => {
    setLoading(false);
    const exe = async () => {
      try {
        const{data} = await GET(`community/${id}`);
        console.log(data);
        setCommunity(data);
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
      <CommunityDetail
                    
                    name={community.name}
                    description={community.description}
                    
                    
                  />
       {posts.map((post) => (
               
                  <Post
                    
                    title={post.title}
                    description={post.description}
                    upvote={post.upvote}
                    downvote={post.downvote}
                    image={post.image}
                    
                  />
                   ))} 
      </div>
    </div>
  );
}