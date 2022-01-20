import React from 'react';
import {Grid} from "@mui/material";

export default function SplashScreen() {
    return (
        <Grid container direction={"row"}
              sx={{background: "linear-gradient(115.06deg, #FF52EE -3.77%, #426BFF 83.22%)", height: "100vh"}}>
            <Grid container item direction={"column"} fontSize="45px" sx={{color: "white"}} alignContent={"center"} marginTop={"45vh"}>
                <Grid item>
                Loading
                </Grid>
            </Grid>
            <Grid container item direction={"column"} fontSize="45px" sx={{color: "white"}} alignContent={"center"}  marginTop={"30vh"}>
                <Grid item>
                    Teaching Aura
                </Grid>
            </Grid>
        </Grid>
    );
}
