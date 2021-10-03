import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Link , useHistory} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import profilepic from '../images/profilepic.png';
import logo from '../images/clique_logo.PNG';
//import { Link , useHistory} from 'react-router-dom'
//import axios from "axios"
const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      backgroundColor: "white",
    },
    image: {
      backgroundImage: `url(${profilepic})`,
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
    save: {
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

    userprofileEditstyle: {
        fontFamily: "Lato",
    }
  }));
  

function UserProfileEdit()
{
    const classes = useStyles();
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [birthdate,setBirthdate] = useState('')
    const [description,setDescription] = useState('')

    //const history=useHistory();
    const [firstnameError,setFirstnameError] = useState(false)
    const [lastnameError,setLastnameError] = useState(false)
    const [usernameError,setUsernameError] = useState(false)
    const [emailError,setEmailError] = useState(false)
    const [birthdateError,setBirthdateError] = useState(false)
    const [descriptionError,setDescriptionError] = useState(false)
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setUsernameError(false)
        setEmailError(false)
        setFirstnameError(false)
        setLastnameError(false)
        setBirthdateError(false)
        setDescriptionError(false)
        

        if(firstname=='')
        {
            setFirstnameError(true)
        }
        if(lastname=='')
        {
            setLastnameError(true)
        }
        if(username=='')
        {
            setUsernameError(true)
        }
        if(email=='')
        {
            setEmailError(true)
            
        }
        if(birthdate=='')
        {
            setBirthdateError(true)
        }
        if(description=='')
        {
            setDescriptionError(true)
        }
       
        
        if(username && email)
        {
            console.log(username,email)
        }

     
    }
    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            <img src={logo} alt="Logo" />
            <Typography variant="h3" component="h2" gutterBottom className={classes.signupstyle}>
                 User Profile
            </Typography>

            <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              onChange={(e) =>setFirstname(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Firstname"
              name="firstname"
              autoComplete="email"
              autoFocus
              error={firstnameError}
           
            />
            <TextField
              onChange={(e) =>setLastname(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Lastname"
              name="lastname"
              autoComplete="email"
              autoFocus
              error={lastnameError}
           
            />
            <TextField
              onChange={(e) =>setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              error={usernameError}
           
            />
            <TextField
              onChange={(e) =>setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
           
            />
            <TextField
              onChange={(e) =>setBirthdate(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              //id="email"
              label="Birthdate"
              name="birthdate"
              //autoComplete="email"
              autoFocus
              error={birthdateError}
           
            />
            <TextField
              onChange={(e) =>setDescription(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              //id="email"
              label="Description"
              name="description"
              //autoComplete="email"
              autoFocus
              error={descriptionError}
           
            />
            

             <Button
              type="save"
              fullWidth
              variant="contained"
              
              className={classes.save}
            >
              Save
            </Button>
            
            </form>
            </div>
            </Grid>
        </Grid>


    ) 
}
export default UserProfileEdit