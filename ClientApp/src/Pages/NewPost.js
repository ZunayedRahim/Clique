import React, { useState , useEffect} from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import man from '../images/rsz_createpost.jpg';
import logo from '../images/clique_logo.PNG';
import { Link, useHistory } from 'react-router-dom'
import axios from "axios"
const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      backgroundColor: "white",
    },
    image: {
        backgroundImage: `url(${man})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: "white",
   
      
      backgroundPosition: 'center',
      
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
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
    photos: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "white",
        color: "black",
        height: 50,
        borderRadius: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#000000',
        '&:hover' : {
          color: "white",
          backgroundColor: "#000000",
          borderColor: "red",
        }
  
      },

      input: {
        display: "none",
      },
    signupstyle: {
        fontFamily: "Lato",
    }
  }));
  

function NewPost()
{
    const classes = useStyles();
    const [titlein,setTitlein] = useState('')
    const [detailsin,setDetailsin] = useState('')
   
    const history=useHistory();
    const [titleError,setTitleError] = useState(false)
    const [detailsError,setDetailsError] = useState(false)

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
  const [file, setFile] = React.useState(null);
  const [filename, setFilename] = React.useState(null);
  const [form, setForm] = React.useState(null);
  const [alert, setAlert] = React.useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    } else {
      console.log("no file selected");
    }
  }, [file]);

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFilename(file.name);
      console.log(file);
    } else {
      setFile(null);
      setFilename(null);
    }
  };


    const onCreatePost = async (e) => {
        e.preventDefault();
        // form.imageURL = file;
        // console.log(form);
        console.log(titlein,detailsin);
        const { data } = await axios.post("https://localhost:5001/thread/add", 
          {
            title: titlein,
            description: detailsin,
            imageURL: "img.url",
            upvote: 0,
            downvote : 0,
            totalVote : 0,
            oP_id : "123123",
            oP_name : "nafisha",
            comment_id : "232323",
            report_count: 0, 

          }
          );
          console.log(data);
          history.push("/LandingPage")

        // try {
        //   var formData = new FormData();
        //   formData.append("title", form.title);
        //   formData.append("description", form.description);
        //   formData.append("imageURL", "img.url");
        //   formData.append("upvote",0);
        //   formData.append("downvote",0);
        //   formData.append("totalVote",0);
        //   formData.append("oP_id","123123");
        //   formData.append("oP_name","nafisha");
        //   formData.append("comment_id","232323");
        //   formData.append("report_count",0);
         
    
          

          
    
        // //   if (data.statusCode === 200) {
        // //     setAlert(null);
        // //     window.location.href = "/";
        // //   }
        // } catch (e) {
        //   console.log(e);
        //   if (e.response) {
        //     setAlert("something");
        //   } else {
        //     console.log("server didnt respond");
        //   }
        // }
      };

    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={6} className={classes.image} />
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            
            <Typography variant="h3" component="h2" gutterBottom className={classes.signupstyle}>
                 Create a new post!
            </Typography>

            <form className={classes.form} noValidate >
            <TextField
               onChange={(e) =>setTitlein(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Give your post a title"
              name="title"
              
              autoFocus
              error={titleError}
            //  className={classes.submit}
            />
            <TextField
              onChange={(e) =>setDetailsin(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              multiline
              rows="8"
              rowsMax="10"
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              error={detailsError}
              
            />
             {/* <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <input
                  accept="image/*"
                 className={classes.input}
                  id="contained-button-file"
                  required
                  type="file"
                  onChange={fileHandler}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    fullWidth={true}
                    className={classes.photos}
                  
                  >
                     Select photo to upload
                  </Button>
                </label>
              </div> */}
             

             <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={onCreatePost}
            >
              Upload
            </Button>
            

          
            </form>
            </div>
            </Grid>
        </Grid>


    ) 
}
export default NewPost