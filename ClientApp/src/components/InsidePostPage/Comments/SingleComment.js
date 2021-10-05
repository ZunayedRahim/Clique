import React, { useState } from 'react';
import Axios from 'axios';
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import man from '../../../images/reaper.png';

function SingleComment(comment) {
   
    console.log(comment);

  

    return (
        <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={man} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.op_name}</h4>
            <div style={{ textAlign: "left" }}>
                {comment.content}
            </div>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    )
}

export default SingleComment