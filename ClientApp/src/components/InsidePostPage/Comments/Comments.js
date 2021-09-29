import React , {useState}from 'react'
import { Button, TextareaAutosize, TextField } from '@material-ui/core'
import axios from 'axios';
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

    }
  }));

function Comments(props) {

    const classes = useStyles();
    const [comment,setComment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        // const variables = { 
        //     content: Comment,
        //     writer: user.userData._id,
        //     postId: props.postId   
        //  }

        // axios.post('/api/comment/saveComment', variables)
        // .then(response=> {
        //     if(response.data.success) {
        //         setComment("")
        //         props.refreshFunction(response.data.result)
        //     } else {
        //         alert('Failed to save Comment')
        //     }
        // })
    }

    return (
        <div>
            <br />
            <p> Comments</p>
            <hr />
            {/* Comment Lists  */}
            {console.log(props.CommentLists)}

            {/* Root Comment Form */}
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