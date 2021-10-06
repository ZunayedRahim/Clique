import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Link , useHistory} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import Topbar from "../../src/components/PrivatePages/Topbar/Topbar";
import { CenterFocusStrong } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      backgroundColor: "white",
    },
    image: {
        //backgroundImage: `url(${profilepic})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: "white",
   
      
      backgroundPosition: 'center',
      
    },
    paper: {
      margin: theme.spacing(2, 45),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      //alignContent:'center',
    },
    
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },

    h1: {
        margin:30,
        fontSize: '40 px',
        fontStyle: 'bold',

    },

    p:{
        margin:30,
        fontSize: (20,20),

    },
   
    aboutusstyle: {
        fontFamily: "Lato",
        //margin:(3,300),
        
    }
  }));

  function AboutUs(){
    const classes = useStyles();

    return(
        <><>
            <Topbar />
            <div className="homeContainer">

            </div>
        </>
        <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <div className={classes.paper}>
                    
                    <Typography variant="h3" component="h2" gutterBottom className={classes.aboutusstyle}>
                             About Us
                    </Typography>
                </div>
                <h1 className={classes.h1}>WELCOME to CLIQUE !!!</h1>
                <p className={classes.p}> Clique is a community where people can fly into their hobbies,interests and passions.They can find ideas,trends,memes and even post videos or images on the platform.It combines contents, social news, a forum, and a social network into one platform.Registered members can contribute to the site with content such as images, text, videos, and links. All content on
                    the site can be voted up or down by other members.
                </p>
                <p className={classes.p}>Firstly, you signup and login your profile. Then you can create your own community or join into a community. Each community will have their distinct features & based on a certain topic. Each community will have moderators for managing the community. You also can post to a community which will open up a thread where other users can react & share their opinion. Other users will have the option to reply to comments creating a chain of comments. Here is a trending page which is updated based on the user's reaction, time and popularity.


                </p>
                <p className={classes.p}>If you want, you will be able to upvote and downvote contents.You can also edit your profile and can chat other users.</p>





                <p className={classes.p}>Let's enjoy your time........
                </p>
            </Grid></>

    )
  }




export default AboutUs
