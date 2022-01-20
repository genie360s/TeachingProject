import React, {useEffect, useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import Img from "../icon/login_img.png"
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {generateId} from "../InstituteFlow/AllCourses/AddCourses";
import {useNavigate} from "react-router-dom";

function OTP() {

    const [otp, setOtp] = useState("");
    const [seconds, setSeconds] = useState(120);
    const [resend, setResend] = useState(true);

    useEffect(() => {

        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setResend(false);
        }
    });

    function secondsToHms(tm: Number) {
        const d = Number(tm);
        const m = Math.floor((d % 3600) / 60);
        const s = Math.floor((d % 3600) % 60);
        const mDisplay = m + ":";
        const sDisplay = s === 0 ? "00" : s;
        return mDisplay + sDisplay;
    }

    function resendOTP() {
        // TODO: add logic here for resending OTP
        setSeconds(120);
    }

    const client = useInjection<AxiosInstance>("client");

    const navigate=useNavigate()
    function signIn() {
        window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user!;
            console.log("User signed in successfully : " + user.uid);

            client.post("/institute", {id: user.uid, ownerContactNumber: user.phoneNumber}).then((response) => {
                console.log("instituteId=>"+JSON.stringify(response.data,null,4))
                navigate("/Profile")
            }).catch((e) =>
                console.log(e)
            )


            // ...
        }).catch((ex: Error) => {
            // User couldn't sign in (bad verification code?)
            // ...
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
                <Grid item xs={2}/>
                <Grid item fontSize={"50px"} color={"#333333"}>
                    OTP Code
                </Grid>
                <Grid item marginTop={"50px"} width={"50%"}>
                    <TextField
                        hiddenLabel
                        autoFocus
                        id="otp"
                        type="password"
                        fullWidth
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                fontSize: "32px",
                                letterSpacing: "30px",
                                paddingLeft: "10px",
                                textAlign: "center",
                                alignContent: "center",
                                borderRadius: "30px"
                            }
                        }}
                        sx={{
                            background: theme => theme.palette.neutral.main,
                            borderRadius: "30px", padding: "10px", paddingLeft: "20px"
                        }}
                        onChange={(event) => {
                            setOtp(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item marginTop={"50px"} color="white" width={"50%"} alignSelf={"center"}>
                    <Button fullWidth id="sign-in-button" color="primary" onClick={signIn}>
                        Continue
                    </Button>
                </Grid>
                <Grid container item alignSelf="center" marginTop={"50px"} color="white" direction={"row"} xs={1}>
                    <Grid item width={"25%"}/>
                    <Grid item width={"25%"}>
                        <Button disabled fullWidth color="primary" onClick={resendOTP}>
                            Time:{secondsToHms(seconds)}
                        </Button>
                    </Grid>
                    <Grid item marginLeft={"10px"} width={"25%"}>
                        <Button disabled={resend} fullWidth onClick={resendOTP}>
                            Resend OTP
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default OTP;
