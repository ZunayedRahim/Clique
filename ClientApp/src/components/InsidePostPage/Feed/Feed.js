import Post from "../Post/Post";
import React, { useEffect } from 'react'
import axios from "axios"
import "./feed.css";
import Grid from '@material-ui/core/Grid';
import { useParams } from "react-router";
import { PinDropSharp, PostAddSharp } from "@material-ui/icons";
import { GET, GET_AUTH, POST_AUTH } from "../../../api/api";
import SingleComment from "../Comments/SingleComment";
import { Button, TextareaAutosize, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

  },
  commentsubmitbg:
  {
      backgroundColor: "white",
  }
}));


export default function Feed(props) {
  const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [comment,setComment] = React.useState('');

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

  useEffect(() => {
    setLoading(false);
    const exe = async () => {
      try {
        const{data} = await GET(`thread/getAllComments/${id}`);
       // const{data} = await axios.get(`https://localhost:5001/thread/${id}`);
       
        console.log(data);
        
        setComments(data);
        console.log(data);
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const{ data} = await POST_AUTH(`thread/addComment/${id}`,
      {
        op_id :  " ", 
        content: comment,
        post_id :  " " ,
       upvote: 0,
       downvote: 0,
       totalvote:0,
       report_no:0,
       op_name :  " ",
      }
    );
    console.log(data);

    




  }



  return (
    <div className="feed">
      <div className="feedWrapper">
      
      
               
                  <Post
                    
                    title= {posts.title}
                    description={posts.description}
                    upvote={posts.upvote}
                    downvote={posts.downvote}
                    id={posts.id}
                    imageURL={posts.imageURL}
                    community_name={posts.community_name}
                    created_at={posts.created_at}
                    
                    
                  />

            <div classname="commentsubmitbg">
           
            <p> Comments</p>
            <hr />
          
            <form style={{ display: 'flex' }}>
                <TextField
                  onChange={(e) =>setComment(e.target.value)} 
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              placeholder="Write some comment"
              type="text"
              
                />
                <br/>
                <Button style={{ width: '20%', height: '52px', marginTop: '16px' ,marginLeft:'5px'}}
                type="submit"
              variant="contained"
              className={classes.submit}
              onClick={handleSubmit}
                 >Submit</Button>
            </form>

        </div>

          {comments.map((comment) =>
          (
            <SingleComment


              content= {comment.content}
              op_name={comment.op_name}
              id={comment.id}


/>
          ))}




                 
                   
      </div>
    </div>
  );
}