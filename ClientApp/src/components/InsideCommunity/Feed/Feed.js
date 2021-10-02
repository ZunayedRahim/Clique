import Post from "../Post/Post";
import React, { useEffect } from 'react'
import axios from "axios"
import "./feed.css";
import Grid from '@material-ui/core/Grid';
import CommunityDetail from "../CommunityDetails/CommunityDetail";


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
      <CommunityDetail
                    
                    title="This is the title of the community"
                    description="Community details Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet malesuada leo, ac aliquet nulla. Nulla eu nunc quis neque luctus tincidunt. Etiam eget justo eu lacus aliquet aliquet sed id sapien. Aenean hendrerit, lacus non venenatis tincidunt, magna quam blandit nulla, nec imperdiet ante est eget leo. Ut sed tellus nibh. Nullam volutpat fermentum ipsum, ut porta nisl sagittis quis. Morbi at rhoncus tortor, eget pellentesque lacus."
                    
                    
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