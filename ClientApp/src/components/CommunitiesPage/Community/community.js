import "./community.css";
import { MoreVert } from "@material-ui/icons";
import profilepic from '../../../images/reaper.png';
import { useState } from "react";
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';
import { Link, useHistory } from 'react-router-dom'
import add from '../../../images/add.png';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#000000",
    color: "white",
    height: 35,
    borderRadius: 5,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#000000',
    '&:hover' : {
      color: "white",
      backgroundColor: "#000000",
      borderColor: "red",
      
    }

  }
}));




export default function Community( post ) {
  const classes = useStyles();
  const history=useHistory();
  const gotologin = async (e) =>{
    e.preventDefault()
    history.push("/Signin");
   


}
// const gotocommunity = async (e) =>{
//   e.preventDefault()
//   // history.push("/CommunityDetails");
 


// }
console.log(post.image_Url+"Getting?");
  return (
      
    <div className="postLandingC" >
      <div className="postWrapper">
        <div className="postTopC">
          <div className="postTopLeft">
            <img
              className="postProfileImgC"
              src={post.image_Url}
              
              alt=""
            />
            <span className="postUsername">
              {post.title}
              
            </span>
            
            
          </div>
          <div className="postTopRight">
          <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={post.onClick}
            >
              Visit
            </Button>
          </div>
      
        </div>
        <div className="postTopDownC" >
        <span className="postCommunityC">
              c/{post.name}
              
            </span>
        </div>
        
        <div className="postCenter">
          <div className="postText"> {post.description}</div>
         
        </div>
         
      </div>
    </div>
  );
}