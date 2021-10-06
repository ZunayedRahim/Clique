import Community from "../Community/community";
import React, { useEffect } from 'react'
import axios from "axios"
import "./feed.css";
import Grid from '@material-ui/core/Grid';
import CreateCom from "../Create/CreateCom";
import { GET } from '../../../api/api'

export default function Feed() {
    const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

//   const req = async () => {
//     const response = await axios.get("https://localhost:5001/thread").then(
//         console.log("getting"))
//     console.log(response);
//     setPosts(response);
//   }
//   req()

  useEffect(() => {
    setLoading(false);
    const exe = async () => {
      try {
        const { data } = await GET("community");
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

  console.log(posts);
  
  return (
    <div className="feed">
      <div className="feedWrapper">
      
      <CreateCom/>
       {posts.map((post) => (
               
                  <Community
                    
                    title={post.name}
                    description={post.description}
                    image_Url={post.image_Url}
                    name={post.name}
                    id = {post.id}

                    onClick = {()=>{
                      console.log(post.id);
                      localStorage.getItem("access_token") != null
                      ?( window.location.href=`/CommunityDetails/${post.id}`)
                      :(window.location.href="/Signin");
                    }}
                    
                  />

                 
                   ))} 
      </div>
    </div>
  );
}