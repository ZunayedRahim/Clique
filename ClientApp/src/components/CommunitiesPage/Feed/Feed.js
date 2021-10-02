import Community from "../Community/community";
import React, { useEffect } from 'react'
import axios from "axios"
import "./feed.css";
import Grid from '@material-ui/core/Grid';


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
        const { data } = await axios.get("https://localhost:5001/thread");
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
      
       {posts.map((post) => (
               
                  <Community
                    
                    title={post.title}
                    description={post.description}
                   
                    
                  />
                   ))} 
      </div>
    </div>
  );
}