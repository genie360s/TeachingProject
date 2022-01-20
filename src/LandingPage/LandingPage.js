import React from "react";
import Grid from "@mui/material/Grid";
import Play from "../icon/Google-Play.png";
import S1 from "../icon/S1.png";
import S2 from "../icon/S2.png";
import Features2 from "../icon/41.png";
import {useNavigate} from "react-router-dom";


const LandingPage = () => {
    let navigate = useNavigate();
    return (
        <React.Fragment>
            <Grid container direction={"column"}
                  sx={{
                      background: " #fbfbfb",
                      width: "100%",
                      height: "100%",
                      paddingLeft: "60px",
                      paddingRight: "60px"
                  }}>
                <Grid container item>
                    <Grid container direction="row" paddingTop="32px" xs={12}>

                        <Grid container item direction="row" alignItems={"center"} xs={4}>
                            <Grid item>
                                <img src="assets/image/SVG/Group.png" height="50px" width={"50px"}/>
                            </Grid>
                            <Grid item fontSize={"28px"} marginLeft={"4px"} fontWeight={"600"}>
                                Teaching Aura
                            </Grid>
                        </Grid>
                        <Grid container direction={"row"} item xs={6} marginTop={"8px"}>
                            <Grid item fontWeight={"500"} fontSize="20px" >Home</Grid>
                            <Grid item fontWeight={"500"} fontSize="20px" marginLeft={"64px"}>About Us</Grid>
                            <Grid item fontWeight={"500"} fontSize="20px" marginLeft={"64px"}>Book a Demo</Grid>
                        </Grid>

                        <div className="sig_btn">
                            <button><i className="fa fa-user"></i>Sign Up/Login</button>
                            <div className="btn_down">
                                <button onClick={()=>navigate("/login")}>Institute</button>
                                <button>Student</button>
                                <button>Teacher</button>
                            </div>
                        </div>
                    </Grid>

                    <Grid container marginTop={"100px"} direction={"row"}>

                        <Grid container item xs={4} fontSize="60px" fontWeight={"500"}>
                            <Grid item fontWeight={"600"}>
                                Teach Anywhere Anytime
                            </Grid>
                            <Grid item>
                                {/*<IconButton disableRipple>*/}
                                <img src={Play} width={"80%"}/>
                                {/*</IconButton>*/}
                            </Grid>
                        </Grid>
                        <Grid item xs={8} paddingLeft={"32px"}>
                            <img src={S1} width={"100%"}/>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid container alignItems={"center"} direction={"row"} xs={12} marginTop={"5%"}>
                    <Grid container item xs={2} marginLeft={"2%"}>
                        <img src={Features2} width={"100%"} height={"90%"}/>
                    </Grid>
                    <Grid container item xs={9} direction={"column"} paddingLeft={"5%"} spacing={5}>
                        <Grid container item direction={"row"} spacing={5}>
                            <Grid item>
                                <div className="not_box_iner1">
                                    <div className="srcl">
                                        <i className="fa fa-graduation-cap"></i>
                                    </div>
                                    <h4> Teach Courses Online </h4>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="not_box_iner1">
                                    <div className="srcl not1">
                                        <i className="fa fa-wifi"></i>
                                    </div>
                                    <h4> 100% Content Security </h4>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container item direction={"row"} spacing={5}>
                            <Grid item>
                                <div className="not_box_iner1">
                                    <div className="srcl">
                                        <i className="fa fa-usd"></i>
                                    </div>
                                    <h4> Fee Management </h4>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="not_box_iner1">
                                    <div className="srcl not1">
                                        <i className="fa fa-video-camera"></i>
                                    </div>
                                    <h4> Student Friendly Platform </h4>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>


                <div className="section3">
                    <div class="titiel">
                        <h1>Features</h1>
                    </div>
                    <div className="custom_class">
                        <Grid container spacing={2} alignItems={"center"}>
                            <Grid item xs={4}>
                                <div className="card_box activ3">
                                    <div className="Img_box">
                                        <div className="icon_box">
                                            <i className="fa fa-certificate"></i>
                                        </div>
                                        <h4>Online lectures</h4>
                                    </div>
                                    <div className="box_text">
                                        <p>Live classes and recorded lectures all at one place.
                                        </p>
                                    </div>
                                </div>

                            </Grid>

                            {/*<Grid item xs={3}>*/}
                            {/*    <div className="card_box">*/}
                            {/*        <div className="Img_box">*/}
                            {/*            <div className="icon_box">*/}
                            {/*                <i className="fa fa-certificate"></i>*/}
                            {/*            </div>*/}
                            {/*            <h4>All inclusive platform</h4>*/}
                            {/*        </div>*/}
                            {/*        <div className="box_text">*/}
                            {/*            <p>From managing and scheduling the daily working of the institute to easy student accessibility</p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}

                            {/*</Grid>*/}


                            <Grid item xs={4}>
                                <div className="card_box">
                                    <div className="Img_box">
                                        <div className="icon_box">
                                            <i className="fa fa-certificate"></i>
                                        </div>
                                        <h4>Batches</h4>
                                    </div>
                                    <div className="box_text">
                                        <p>Multiple batches for better teacher-student experience</p>
                                    </div>
                                </div>

                            </Grid>


                            <Grid item xs={4}>
                                <div className="card_box">
                                    <div className="Img_box">
                                        <div className="icon_box">
                                            <i className="fa fa-certificate"></i>
                                        </div>
                                        <h4>Chat</h4>
                                    </div>
                                    <div className="box_text">
                                        <p>New-age Interactive classes with polling options available</p>
                                    </div>
                                </div>

                            </Grid>

                            <Grid item xs={5}>
                                <div className="card_box">
                                    <div className="Img_box">
                                        <div className="icon_box">
                                            <i className="fa fa-certificate"></i>
                                        </div>
                                        <h4>Tests</h4>
                                    </div>
                                    <div className="box_text">
                                        <p>Adaptive and Interactive assessments for fruitful and student-specific Result Reports
                                        </p>
                                    </div>
                                </div>

                            </Grid>

                            <Grid item xs={7}>
                                <div className="card_box activ3">
                                    <div className="Img_box">
                                        <div className="icon_box">
                                            <i className="fa fa-certificate"></i>
                                        </div>
                                        <h4>All inclusive platform</h4>
                                    </div>
                                    <div className="box_text">
                                        <p>From managing and scheduling the daily working of the institute to easy student accessibility</p>
                                    </div>
                                </div>

                            </Grid>


                        </Grid>
                    </div>
                </div>
            </Grid>

            <div className="banner_cent">
                <span>coaching realm in your room</span>
            </div>

            <div className="box_manageINs">
                <div className="banner_tittl">
                    <div className="banner_tidd_inner">
                        <h4>Manage your institute in one place</h4>
                    </div>
                </div>

                <Grid container alignItems={"center"}>
                    <img src={S2} width={"90%"} height={"100%"}/>
                </Grid>
            </div>

            {/*<div class="cond">*/}
            {/*    <div className="section3 section344">*/}
            {/*        <div class="titiel">*/}
            {/*            <h2>Feature</h2>*/}
            {/*        </div>*/}
            {/*        <div className="banner_box_bo">*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}


            <footer className="foot_box">
                <div className="foot_tittle">
                    <h1>Teaching Aura</h1>
                </div>
                <div className="box_cont_foot">
                    <span>contact us</span>
                    <span>+91 8287718282 <label>rishabhj@teachingaura.com </label></span>
                </div>
                <Grid container spacing={-2}>
                    <Grid item xs={6}>
                        <div className="box_foot_ling">
                            <h4>Links</h4>
                            <div className="box_de">
                                <span>Home</span>
                                <span onClick={() => {navigate("/privacy")}}>Privacy Policy</span>
                                <span onClick={() => {navigate("/TermsAndConditions")}}>Terms and Conditions</span>
                                {/*<span>FAQ </span>*/}
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={6}>
                        <div className="box_foot_ling">
                            <h4>FOLLOW US IN SOCIAL MEDIA</h4>
                            <div className="box_de box_deS">
                                <div className="social_boxl">
                                    <i className="fa fa-facebook"></i>
                                </div>
                                <div className="social_boxl">
                                    <i className="fa fa-dribbble"></i>
                                </div>
                                <div className="social_boxl">
                                    <i className="fa fa-dropbox"></i>
                                </div>
                                <div className="social_boxl">
                                    <i className="fa fa-play"></i>
                                </div>
                                <div className="social_boxl">
                                    <i className="fa fa-youtube-play"></i>
                                </div>

                            </div>
                        </div>
                    </Grid>


                </Grid>
            </footer>


        </React.Fragment>
    );
};

export default LandingPage;
