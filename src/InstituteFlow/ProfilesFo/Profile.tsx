import React, {useEffect, useState} from "react";
import HeadSub from "../../components/HeadSub";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Side_Menu from "../../components/Side_Menu";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

import TextareaAutosize from '@mui/material/TextareaAutosize';
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";


const Profile = () => {
        const instituteId = useInjection<SignInDetails>("signInDetails").id

        const [Name, setName] = useState("")
        const [Email, setEmail] = useState("")
        const [OwnerName, setOwnerName] = useState("")
        const [ContactNumber, setContactNumber] = useState("")
        const [AboutUs, setAboutUs] = useState("")
        const [id, setId] = useState("")
        const [logo, setLogo] = useState("")

        const client = useInjection<AxiosInstance>("client");
        const signInDetails = useInjection<SignInDetails>("signInDetails");
        const Input = styled("input")({
            display: "none",
        });


        const storage = getStorage();
        const storageRef = ref(storage, signInDetails.id + "/profile");

        const uploadProfileImage = (file) => {
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log("Uploaded profile photo on path : " + signInDetails.id + "/profile");
            });
        }

        useEffect(() => {

            getDownloadURL(storageRef).then((url) => {
                setLogo(url)
            })

            client.get('/institute/' + signInDetails.id).then(response => {
                //setId(response.data['id'])
                setName(response.data["instituteName"])
                setOwnerName(response.data["ownerName"])
                setEmail(response.data["ownerEmail"])
                setContactNumber(response.data["ownerContactNumber"])
                setAboutUs(response.data['AboutUs'])
                setLogo(response.data['logo'])
            })
        }, []);

        const Handle = () => {
            const data = {
                aboutUs: AboutUs,
                id: instituteId,
                instituteName: Name,
                logo: logo,
                ownerContactNumber: ContactNumber,
                ownerEmail: Email,
                ownerName: OwnerName
            }
            console.log(data)
            client.put(`/institute/${instituteId}`, data).catch((e) => console.log('not updated', e))
        }
        return (
            <React.Fragment>

                <div className="content_full_container box_ladto ">
                    <Side_Menu/>
                    <div className="content_box content_box22">
                        <header className="heder_nav  ">
                            <div className="box_vc_nav_right">
                                <h4>Profile</h4>
                            </div>
                            <div className="box_vc_nav_left">
                                <HeadSub/>
                            </div>
                        </header>

                        <div className="conte_box_deboard ">
                            <div className="conte_box_deboard_inner">
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <div className="profile_cont">
                                            <img src="assets/image/bg.jpg"/>
                                            <div className="uploadbtn">
                                                <label
                                                    htmlFor="contained-button-file"
                                                    className="btnx_hede2dc"
                                                >
                                                    <Input
                                                        accept="image/*"
                                                        id="contained-button-file"
                                                        multiple
                                                        type="file"
                                                        onChange={(e) => {
                                                            if (e.target.files != null) {
                                                                console.log("Attemptintg to upload profile pic")
                                                                uploadProfileImage(e.target.files.item(0))
                                                            }
                                                        }}
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        component="span"
                                                        className="btnx_hedex "
                                                    >
                                                        <CameraAltIcon className="icon_uplo"/>
                                                    </Button>
                                                </label>
                                            </div>

                                            <div className="profile_img_con">
                                                <div className="pro_inner">
                                                    <img src={logo}/>
                                                    <div className=" uploadbtn2">
                                                        <label
                                                            htmlFor="contained-button-file"
                                                            className="btnx_hede2dc "
                                                        >
                                                            {/*<Input*/}
                                                            {/*    accept="image/*"*/}
                                                            {/*    id="contained-button-file"*/}
                                                            {/*    multiple*/}
                                                            {/*    type="file"*/}
                                                            {/*    onChange={(e) => {console.log("Reached here 2" + e)}}*/}
                                                            {/*/>*/}
                                                            <Button
                                                                variant="contained"
                                                                component="span"
                                                                className="btnx_hedex btnx_hede2dc33"
                                                            >
                                                                <CameraAltIcon className="icon_uplo"/>
                                                            </Button>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid item xs={11}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <TextField
                                                    value={Name}
                                                    type="text"
                                                    label="Name"
                                                    className="box_vde"
                                                    InputLabelProps={{shrink: true}}
                                                    onChange={(e) => {
                                                        setName(e.target.value)
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={4}>
                                                <TextField
                                                    value={OwnerName}
                                                    type="text"
                                                    label="Owner Name"
                                                    className="box_vde"
                                                    InputLabelProps={{shrink: true}}
                                                    onChange={(e) => {
                                                        setOwnerName(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    value={Email}
                                                    type="text"
                                                    label="Owner Email"
                                                    className="box_vde"
                                                    InputLabelProps={{shrink: true}}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value)
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={4}>
                                                <TextField
                                                    value={ContactNumber}
                                                    type="text"
                                                    label="Phone number"
                                                    className="box_vde"
                                                    InputLabelProps={{shrink: true}}
                                                    onChange={(e) => {
                                                        setContactNumber(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="teit_all mb-3">
                                            <h4>About Us</h4>

                                        </div>
                                        <TextareaAutosize
                                            value={AboutUs}
                                            aria-label="empty textarea"
                                            placeholder="Minimum 3 rows"
                                            minRows={6}
                                            className="textAreaca"
                                            onChange={(e) => setAboutUs(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>


                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>

                                            </Grid>

                                            <Grid item xs={4}>
                                                <button className='btn_custond' onClick={Handle}>
                                                    Update
                                                </button>

                                            </Grid>
                                        </Grid>


                                    </Grid>
                                </Grid>

                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
;

export default Profile;
