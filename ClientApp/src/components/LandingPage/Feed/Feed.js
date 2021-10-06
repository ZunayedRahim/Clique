import Post from "../Post/Post";
import React, { useEffect } from 'react'
import axios from "axios"
import "./feed.css";
import Grid from '@material-ui/core/Grid';
import Sort from "../Sort/Sort";
import { GET, GET_AUTH } from "../../../api/api";
import {  useHistory } from 'react-router-dom'
import New from '../../../images/sticker.png'
import Trend from '../../../images/trend.png'
import Top from '../../../images/arrow-up.png'


export default function Feed() {
    const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [newposts, setNewPosts] = React.useState([]);
  const [topposts, setTopPosts] = React.useState([]);
  const [top, setTop] = React.useState(false);
  const [newp, setNewp] = React.useState(false);
  const history=useHistory();

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
        const { data } = await GET("thread");
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

  function createpost(){
    history.push("/SeeCommunities")

}
function gotocommunities(){
    history.push("/SeeCommunities")

}

const newClicked = async(e) => {
    e.preventDefault();
    const{ data} = await GET("thread/privatethreadByNew")
    console.log(data);
    setNewPosts(data);
    setPosts(data);
    setNewp(true);



    

  
}

const topClicked = async(e) => {
    e.preventDefault();
    const{ data} = await GET("thread/privatethreadByTop")
    console.log(data);
    setTopPosts(data);
    setPosts(data);
    setTop(true);
}



  return (
    <div className="feed">
      <div className="feedWrapper">
      <div className="share">
    <div className="shareWrapper">
      <div className="shareBottom">
          <div className="options">
              
          <div className="option">
              <img src={New} alt="" className="optionIcon" onClick={newClicked}/>
                  <span className="optionText">New</span>
              </div>
              <div className="option">
              <img src={Top} alt="" className="optionIcon" onClick={topClicked}/>
                  <span className="optionText">Top</span>
              </div>
             
              
          </div>
          <button className="addButton" onClick={createpost}>See Communities</button>
      </div>
    </div>
  </div>
       {posts.map((post) => (
               
                  <Post
                    
                    title={post.title}
                    description={post.description}
                    upvote={post.upvote}
                    downvote={post.downvote}
                    imageURL={post.imageURL}
                    community_name={post.community_name}
                    created_at = {post.created_at}
                    id = {post.id}
                    onClick = {()=>{
                      localStorage.getItem("access_token") != null
                      ?(window.location.href=`/InsidePost/${post.id}`)
                      :(window.location.href="/Signin");
                      
                     
                    }}
                  />
                   ))} 
      </div>
    </div>
  );
}