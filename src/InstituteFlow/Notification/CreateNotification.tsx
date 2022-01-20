import React from 'react';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
const CreateNotification = () => {
    const Input = styled('input')({
        display: 'none',
      });
      
 
    return (
        <>

<Grid container spacing={2}>
  
  <Grid item xs={12}>
  <TextField
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, velLorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, velLorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel"
              type="textarea"
              label="Test Description"
              variant="filled"
              className="box_vde"
            />
  </Grid>
  <Grid item xs={3}>
  <TextField
              defaultValue="Start Test Time"
              type="time"
              label="Lecture topic"
              variant="filled"
              className="box_vde"
              focused 
            />
  </Grid>
  <Grid item xs={3}>
  <TextField
              defaultValue="Start Date"
              type="date"
              label="Lecture topic"
              variant="filled"
              className="box_vde"
              focused 
            />
  </Grid>
  <Grid item xs={3}>
  <TextField
              defaultValue="Start Test Time"
              type="time"
              label="Lecture topic"
              variant="filled"
              className="box_vde"
              focused 
            />
  </Grid>
  <Grid item xs={3}>
  <TextField
              defaultValue="End Date"
              type="date"
              label="Lecture topic"
              variant="filled"
              className="box_vde"
              focused 
            />
  </Grid>

  <Grid item xs={3}>
  
      <label htmlFor="contained-button-file" className='btnx_hede2dc'>
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span" className="btnx_hede " >
        <CreateNewFolderIcon sx={{marginRight: "10px"}}/> Upload Test
        </Button>
       
      </label>
      
    
  </Grid>
  <Grid item xs={12}>
  
  {/* <div className="btn_box">
                <button
                  className={
                  "btn_vs_over box_flex_" 
                  }
                 
                >
                 overview
                </button>

              </div> */}
<Grid container spacing={2}   className='mavde'>
<Grid item xs={4}> 
        <button className='btn_custond'>
        Add
        </button>
     
     </Grid>
</Grid>



</Grid>
</Grid>
        
        </>
    );
}

export default CreateNotification;
