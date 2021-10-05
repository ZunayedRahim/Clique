import React , {useState}from 'react'
import { Button, TextareaAutosize, TextField } from '@material-ui/core'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'
import { GET, GET_AUTH, POST_AUTH } from "../../../api/api";
import  { useEffect } from 'react'

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

function Comments(props) {

    const classes = useStyles();
    const [comment,setComment] = useState('')
    const [loading, setLoading] = React.useState(true);
    const [comments, setComments] = React.useState([]);

    // useEffect(() => {
    //   setLoading(false);
    //   const exe = async () => {
    //     try {
    //       // const { data } = await GET("getAllComments/{id}");
    //       // console.log(data);
    //       // setComments(data);
    //       // setLoading(false);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   };
    //   exe();
    // }, []);

    // console.log(comments);

    const handleSubmit = async(e) => {
       
     // const{ data} = await POST_AUTH(`addComment/${id}`)


    }

    return (
        <div>
            <br />
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
              onSubmit={handleSubmit}
                 >Submit</Button>
            </form>

        </div>
    )
}

export default Comments