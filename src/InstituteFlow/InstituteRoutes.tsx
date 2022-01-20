import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "../assets/css/style.scss";
import "../assets/css/responsive.scss";
import "../assets/css/taplate.scss";
import Dashboard from "./Dashboard";
import {BatchesTest} from "./Batches/BatchesTest";
import AllBatches from "./AllBatchesGroup/AllBatches";
import Students from "./StudentsDes/Students";
import Notificationli from "./Notification/Notificationli";
import AllCourses from "./AllCourses/AllCourses";
import Profile from "./ProfilesFo/Profile";
import LandingPage from "../LandingPage/LandingPage";
import {createTheme, ThemeProvider} from "@mui/material";
import Login from "../LoginFlow/Login";
import OTP from "../LoginFlow/OTP";
import InstituteSignUp from "../LoginFlow/institutes-sign-up";
import {useInjection} from "inversify-react";
import {SignInDetails} from "../LoginFlow/SignInDetails";
import SplashScreen from "../LoginFlow/SplashScreen";
import {observer} from "mobx-react-lite";
import Teachers from "./TeachersDes/Teachers";
import Privacy from "../LandingPage/PrivacyPolicy";
import CourseSyllabus from "./AllCourses/CourseSyllabus";
import TermsAndConditions from "../LandingPage/TermsAndConditions";

function InstituteRoutes() {


    const theme = getTheme();

    const signInDetails = useInjection<SignInDetails>("signInDetails")

    function getPrivateComponent(Component) {
        return observer(() => {
                return signInDetails.isLoaded ? signInDetails.isSignedIn ? <Component/> : <Login/> :
                    <SplashScreen/>
            }
        );
    }


    function getPublicComponent(Component) {
        return observer(() => {
                if (signInDetails.isLoaded) {
                    if (signInDetails.isSignedIn) {
                        return <Dashboard/>
                    }
                    return <Component/>
                }
                return <SplashScreen/>
            }
        );
    }


    const SignUpComponent = getPublicComponent(InstituteSignUp);
    const LoginComponent = getPublicComponent(Login);
    const OTPComponent = getPublicComponent(OTP);
    const TeacherComponent = getPrivateComponent(Teachers);
    const StudentsComponent = getPrivateComponent(Students);
    const DashboardComponent = getPrivateComponent(Dashboard);
    const AllCoursesComponent = getPrivateComponent(AllCourses);
    const ProfileComponent = getPrivateComponent(Profile);
    const CourseSyllabusComponent = getPrivateComponent(CourseSyllabus);
    const AllBatchesComponent = getPrivateComponent(AllBatches);


    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>

                    <Route path="/login" element={<LoginComponent/>}/>
                    <Route path="/signup" element={<SignUpComponent/>}/>
                    <Route path="/otp" element={<OTPComponent/>}/>
                    <Route path="/home" element={<DashboardComponent/>}/>
                    <Route path="/courses" element={<AllCoursesComponent/>}/>
                    <Route path="/students" element={<StudentsComponent/>}/>
                    <Route path="/teachers" element={<TeacherComponent/>}/>
                    <Route path="/AllBatches" element={<AllBatchesComponent/>}/>
                    <Route path="/course_batches" element={<AllBatchesComponent/>}/>



                    <Route path="/course" element={<CourseSyllabus/>}/>
                    <Route path="/course_batches" element={<AllBatches/>}/>
                    <Route path="/batch" element={<BatchesTest/>}/>
                    <Route path="/AllBatches" element={<AllBatches/>}/>
                    <Route path="/Notificationli" element={<Notificationli/>}/>
                    <Route path="/Profile" element={<ProfileComponent/>}/>
                    <Route path="/privacy" element={<Privacy/>}/>
                    <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );


}

declare module "@mui/material/styles" {
    interface Palette {
        neutral: Palette["primary"];
        whites: Palette["primary"];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions["primary"];
        whites?: PaletteOptions["primary"];
    }

    // interface BreakpointOverrides {
    //     xs: false; // removes the `xs` breakpoint
    //     sm: false;
    //     md: false;
    //     lg: false;
    //     xl: false;
    // }
}

function getTheme() {
    const theme = createTheme({
        palette: {
            neutral: {
                main: "#EEEEEE",
                dark: "#EEEEEE",
            },
            primary: {
                main: "#2697FE",
                dark: "#2697FE",
            },
            secondary: {
                main: "#FF3998",
                dark: "#FF3998",
            },
            whites: {
                main: "#FFFFFF",
                dark: "#FFFFFF",
                contrastText: "#000000",
            },
            action: {
                disabledBackground: "#EEEEEE",
            },
        },
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        // '&:hover': {
                        //     backgroundColor: "none"
                        // }
                    },
                },
            },
            // Name of the component
            MuiButton: {
                defaultProps: {
                    // The props to change the default for.
                    disableRipple: true, // No more ripple!
                    variant: "contained",
                },
                styleOverrides: {
                    // Name of the slot
                    root: {
                        padding: "16px",
                        // Some CSS
                        borderRadius: "30px",
                        textTransform: "none",
                        fontSize: "18px",
                        "&.Mui-disabled": {
                            background: "#EEEEEE",
                            color: "black",
                        },
                    },
                },
            },
            MuiFormLabel: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        paddingLeft: "15px",
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    variant: "filled",
                },
            },
            MuiInput: {
                defaultProps: {
                    disableUnderline: true,
                },
            },
            MuiFilledInput: {
                defaultProps: {
                    disableUnderline: true,
                },
            },
        },
    });
    return theme;
}


// Update the Button's color prop options
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        neutral: true;
        whites: true;
    }
}

export default InstituteRoutes;
