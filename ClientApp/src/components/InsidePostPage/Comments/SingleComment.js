import React, { useState } from 'react';
import Axios from 'axios';
import { Divider, Avatar, Grid, Paper, TextField, Button } from "@material-ui/core";
import man from '../../../images/reaper.png';
import upvote from '../../../images/upvote.png';
import downvote from '../../../images/down.png';
import reply from '../../../images/reply.png';
import "./singlecomment.css";
import { makeStyles } from '@material-ui/core/styles'
import { GET, POST, POST_AUTH } from '../../../api/api';
import  { useEffect } from 'react'


const useStyles = makeStyles((theme) => ({
    
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#000000",
      color: "white",
     marginLeft: 5,
     height: 30,
     
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

function SingleComment(comment) {
    const classes = useStyles();
    console.log(comment);
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    const [loading, setLoading] = React.useState(true);
    const [replies, setReplies] = React.useState([]);


    useEffect(() => {
        setLoading(false);
        const exe = async () => {
          try {
            const{data} = await GET(`thread/getReply/${comment.id}`);
           // const{data} = await axios.get(`https://localhost:5001/thread/${id}`);
           
            console.log(data);
            
            setReplies(data);
            console.log(data);
            setChildCommentNumber(data.length);
            setLoading(false);
          } catch (e) {
            console.log(e);
          }
        };
        exe();
      }, []);
    
    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const { data } = await POST_AUTH(`thread/createReply/${comment.id}`,
        {
            content: CommentValue,
            upvote: 0,
            downvote: 0,
            totalvote: 0,
            report_no: 0
        }
        
        )

        console.log(data);
    }

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <Paper style={{ padding: "20px 20px", borderRadius: "0px" }}>
        <Grid container wrap="nowrap" spacing={1}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={man} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.op_name}</h4>
            <div style={{ textAlign: "left" }}>
                {comment.content}
            </div>
           
          </Grid>
        </Grid>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={upvote} alt="" />
            <span className="postLikeCounter">
            0
            </span>
            <img className="likeIcon" src={downvote}  alt=""/>
            <span className="postLikeCounter">0</span>

            <img className="reply" src={reply}  alt="" onClick={openReply}/>
            <span className="postLikeCounter" onClick={openReply}>reply</span>
          </div>
         
        </div>

        <br/>
        {OpenReply &&
                <form style={{ display: 'flex' }}>
                    <TextField
                        style={{ width: '100%', borderRadius: '5px' }}
                        variant="outlined"
                         margin="normal"
                         fullWidth
                        placeholder="write some comments"
                        onChange={(e) =>setCommentValue(e.target.value)}
                    />
                    <br />
                    <Button className={classes.submit} onClick={onSubmit}>Submit</Button>
                </form>
            }


            <div>

            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                    onClick={handleChange} >
                    View {ChildCommentNumber} more comment(s)
             </p>
            }

            {OpenReplyComments &&

              
                <form style={{ display: 'block' }}>

                {replies.map((reply) =>
                (
                    <div>
                    <span>
                       {reply.content}
                   </span>
                   
                   <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIconreply" src={upvote} alt="" />
            <span className="postLikeCounter">
            0
            </span>
            <img className="likeIconreply" src={downvote}  alt=""/>
            <span className="postLikeCounter">0</span>

        
          </div>
         
        </div>
        <hr />

                    </div>
                    
                  
                   
                    
                ))}
                    
                </form>
            }

        </div>

      </Paper>
    )
}

export default SingleComment