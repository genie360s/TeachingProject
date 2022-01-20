import {Button, Grid, TextField,} from "@mui/material";
import Img from "../icon/institute_sign_up_img.png"
import logo from "../icon/Logo.png"
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';

function InstituteSignUp() {

    let navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const auth = getAuth();
    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': () => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // TODO: keep sign button disable until this is verified
            }
        }, auth);
    });


    function signUp() {
        const phoneNumber = "+91" + phone
        const appVerifier = window.recaptchaVerifier;
        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                // @ts-ignore
                window.confirmationResult = confirmationResult;
                //console.log("user SignUp successfully!");
                navigate("/otp");
            }).catch((error) => {
            console.error("Unable to SignUp!!"+error);
        });
    }

    return (<Grid container direction={"row"}
                  sx={{background: "#FBFBFB"}}>
        <Grid container item xs={5} height={"100vh"} direction={"row"} alignItems={"center"}>
            <Grid item>
                <img src={Img} alt='Logo' width={"100%"} height={"80%"}/>
            </Grid>
        </Grid>
        <Grid container item direction="column" xs={7} alignItems={"center"}>
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
                Sign Up
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
                    sx={{background: "#EEEEEE", borderRadius: "30px", padding: "10px"}}
                    onChange={(event) => {
                        setPhone(event.target.value)
                    }}
                />
            </Grid>

            <Grid item marginTop={"50px"} color="white" width={"50%"}>
                <Button fullWidth id="sign-in-button" sx={{
                    background: theme => theme.palette.primary.main, color: "white", padding: "10px"
                }} onClick={signUp}>
                    Send Otp
                </Button>
            </Grid>

            <Grid item marginTop='2vh' fontSize={"15px"} color={"#333333"}>
                Already a member? <Link to='/login'>Sign In</Link>
            </Grid>
        </Grid>
    </Grid>);
}

export default InstituteSignUp;
