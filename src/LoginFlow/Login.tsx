import React, {useEffect, useState} from 'react';
import {Button, Grid, IconButton, InputAdornment, List, ListItem, makeStyles, TextField} from "@mui/material";
import Img from "../icon/login_img.png"
import {getAuth, RecaptchaVerifier} from "firebase/auth";
import {signInWithPhoneNumber} from "firebase/auth";
import {Navigate, useNavigate} from "react-router-dom";


function Login() {

    const auth = getAuth();
    let navigate = useNavigate();
    const [phone, setPhone] = useState("");

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': () => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // TODO: keep sign button disable until this is verified
            }
        }, auth);
    });

    function signIn() {
        const phoneNumber = "+91" + phone
        const appVerifier = window.recaptchaVerifier;
        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                // @ts-ignore
                window.confirmationResult = confirmationResult;
                console.log("OTP sent to user!");
                navigate("/otp");
            }).catch((error) => {
            console.error("Unable to send OTP!!");
        });
    }

    return (
        <Grid container direction={"row"} alignContent={"center"}
              sx={{background: "#FBFBFB"}}>
            <Grid container item xs={5} height={"100vh"} direction={"column"} justifyContent={"space-around"}>
                <Grid item/>
                <Grid item>
                    <img src={Img}/>
                </Grid>
            </Grid>
            <Grid container item direction="column" xs={6} alignItems={"center"}>
                <Grid item xs={1}/>
                <Grid container item direction={"row"} justifyContent={"center"} color={"#333333"}>
                    <Grid item marginTop={"8px"}>
                        <img src="assets/image/SVG/Group.png" height="50px" width={"50px"}/>
                    </Grid>
                    <Grid item fontSize={"50px"} marginLeft={"4px"} fontWeight={"500"}>
                        Teaching Aura
                    </Grid>
                </Grid>
                <Grid item xs={1}/>
                <Grid item fontSize={"50px"} color={"#333333"}>
                    Sign in
                </Grid>
                <Grid item marginTop={"50px"} width={"50%"}>
                    <TextField
                        autoFocus
                        required
                        id="phone"
                        label="Phone number"
                        type="phone"
                        fullWidth
                        variant="standard"
                        sx={{background: "#EEEEEE", borderRadius: "30px", padding: "10px "}}
                        onChange={(event) => {
                            setPhone(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item marginTop={"50px"} color="white" width={"50%"}>
                    <Button fullWidth id="sign-in-button" sx={{
                        background: theme => theme.palette.primary.main,
                        color: "white", padding: "10px", //marginLeft:"10px",
                    }} onClick={signIn}>
                        Continue
                    </Button>
                </Grid>
                <Grid item marginTop={"50px"} color="white" width={"30%"}>
                    <Button fullWidth color="neutral" sx={{
                        color: "#888888", padding: "10px",
                    }} onClick={()=>navigate("/signup")}>
                        Sign up
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Login;
