import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";

import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {generateId} from "../AllCourses/AddCourses";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {RefreshBatches} from "../../observables/RefreshEvents";

const AddBatchBtn = (props) => {
    const instituteId = useInjection<SignInDetails>("signInDetails").id

    const BatchDetails = {
        courseId: "",
        courseName: "",
        id: generateId(),
        instituteId: props.instituteId,
        name: "",
        startDate: 0
    }

    const client = useInjection<AxiosInstance>("client");
    const [AllCourses, setAllCourse] = useState([]);
    const getAllCourses = async () => {
        setAllCourse((await client.get(`/institute/${instituteId}/course`)).data)
        //console.log(AllCourses);
    }
    useEffect(() => {
        getAllCourses()
    }, [])


    const Handling = (e) => {
        props.closevc();
        client.post(`/institute/${instituteId}/batch`, BatchDetails).then((response) => {
                //console.log(JSON.stringify(response.data))
                RefreshBatches.next()
            }
        ).catch(e => console.log(e))
        //console.log(BatchDetails)
    }

    return (
        <>
            <Dialog
                open={props.open_log}
                onClose={() => {
                    props.closevc();
                }}

                className="vsxd"

            >
                <div className="box_form_custom">


                    <Typography variant="h6" component="h2" align="center" gutterBottom>
                        Create Batch
                    </Typography>
                    <div className="input_fleil_box mt-3">

                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select Course"
                            variant="filled"
                            className="box_vde"
                        >

                            {AllCourses.map((option) => (
                                <MenuItem key={option['id']} value={option['id']} onClick={(e) => {
                                    BatchDetails.courseId = option['id'];
                                    BatchDetails.courseName = option['name'];
                                    console.log(BatchDetails)
                                }}>
                                    {option['name']}
                                </MenuItem>
                            ))}

                        </TextField>
                        <TextField
                            onChange={(e) => {
                                BatchDetails.name = e.target.value;
                                console.log(BatchDetails)
                            }}
                            //defaultValue="name"
                            type="text"
                            label="Batch Name"
                            variant="filled"
                            className="box_vde"
                        />
                        <TextField
                            onChange={(e) => {
                                BatchDetails.startDate = Date.parse(e.target.value);
                                console.log(BatchDetails)
                            }}
                            type="date"
                            label="Start Date"
                            //defaultValue="02-23-2001"
                            variant="filled"
                            className="box_vde"
                            focused
                        />


                        <div className="btn_box mt-2">
                            <button className="btn_vs_over  btn_vs_over_2v" onClick={Handling}>
                                Create
                            </button>

                        </div>
                    </div>
                </div>
            </Dialog>
            ;
        </>
    );
};

export default AddBatchBtn;
