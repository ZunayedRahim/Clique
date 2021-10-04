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
import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@material-ui/core'
import { POST, POST_AUTH } from '../api/api'
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
    fontFamily: "Lato",
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
  

function CreateCommunity()
{
    const classes = useStyles();
    const [titlein,setTitlein] = useState('')
    const [detailsin,setDetailsin] = useState('')
    const [categoryCom,setCategoryCom] = useState('public')
    const history=useHistory();
    const [titleError,setTitleError] = useState(false)
    const [detailsError,setDetailsError] = useState(false)

   
  const [file, setFile] = React.useState(null);
  const [filename, setFilename] = React.useState(null);
  const [form, setForm] = React.useState(null);
 

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    } else {
      console.log("no file selected");
    }
  }, [file]);

  const onInputChange = (event) => {
    console.log("Getting");
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
   // form.CoverPhoto = file;

  // form.creator = "123456"
    console.log(form);
    try {
      var formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
     
      formData.append("member_no", 15 );
      formData.append("coverPhoto", file);
      formData.append("category", categoryCom);
    
      // const config = {
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("access_token"),
      //   },
      // };
      console.log(formData);
      const { data } = await POST_AUTH(`community/add`,formData);
      console.log(data);

      if (data.statusCode === 200) {
        console.log("success");
      }
    } catch (e) {
      console.log(e);
      if (e.response) {
       
      } else {
        console.log("server didnt respond");
      }
    }
  };


    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={6} className={classes.image} />
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            
            <Typography variant="h3" component="h2" gutterBottom className={classes.signupstyle}>
                 Create a new community!
            </Typography>

            <form className={classes.form} noValidate >
            <TextField
              onChange ={onInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Give your community a name"
              name="name"
              
              autoFocus
              error={titleError}
            //  className={classes.submit}
            />
            <TextField
              onChange ={onInputChange}
              variant="outlined"
              margin="normal"
              required
              multiline
              rows="8"
              rowsMax="10"
              fullWidth
              name="description"
              label="Description about your community"
              type="text"
              id="description"
              error={detailsError}
              
            />
            <FormControl component="fieldset">
        <FormLabel component="legend">What type of community is this?</FormLabel>
          <RadioGroup aria-label="community" name="community" value={categoryCom} onChange={(e) =>setCategoryCom(e.target.value)}>
           <FormControlLabel value="public" control={<Radio />} label="Pubic" />
          <FormControlLabel value="private" control={<Radio />} label="Private" />
 
          </RadioGroup>
        </FormControl>
            
             <div style={{ marginTop: "var(--margin-item-spacing)" }}>
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
                     Select cover photo to upload
                  </Button>
                </label>
              </div>
             

             <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={onCreatePost}
            >
              Create
            </Button>
            

          
            </form>
            </div>
            </Grid>
        </Grid>


    ) 
}
export default CreateCommunity