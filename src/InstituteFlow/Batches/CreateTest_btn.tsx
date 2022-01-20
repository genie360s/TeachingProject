import React from "react";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {generateId} from "../AllCourses/AddCourses";
import {RefreshLectures} from "../../observables/RefreshEvents";

const CreateTest_btn = (props) => {
    // const [addDialogOpen, setAddDialogOpen] = React.useState(false);

    const client = useInjection<AxiosInstance>("client");
    let lectureDetails = {
        batchId: props.batchData['id'],
        courseId: props.batchData['courseId'],
        endTime: 0,
        hostUrl: "",
        id: generateId(),
        instituteId: props.batchData['instituteId'],
        joinUrl: "",
        startTime: 0,
        teacherId: "1010",
        topicName: ""
    }
    const Init = () => {
        lectureDetails = {
            batchId: props.batchData['id'],
            courseId: props.batchData['courseId'],
            endTime: 0,
            hostUrl: "",
            id: generateId(),
            instituteId: props.batchData['instituteId'],
            joinUrl: "",
            startTime: 0,
            teacherId: "",
            topicName: ""
        }
    }

    const dateTime = (date, time) => {
        return Date.parse(date + " " + time)
    }

    const handleChange = (event, element) => {
        lectureDetails[element] = event.target.value;
        //console.log(lectureDetails)
    };
    const handleCreate = (e) => {
        lectureDetails.startTime = dateTime(lectureDetails['sd'], lectureDetails['st']);
        lectureDetails.endTime = dateTime(lectureDetails['ed'], lectureDetails['et']);

        if (isNaN(lectureDetails.startTime) || isNaN(lectureDetails.endTime)) {
            //console.log("date dal le bhai")
        } else {
            delete lectureDetails['sd']
            delete lectureDetails['st']
            delete lectureDetails['ed']
            delete lectureDetails['et']
            //console.log("final => " + lectureDetails)
            props.closevc();
            client.post(`/institute/${props.batchData['instituteId']}/schedule`, lectureDetails).then((response) => {
                //console.log("success")
                RefreshLectures.next()

                Init()
            }).catch(e => {
                //console.log(e)
            })
        }


        //console.log(lectureDetails)


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
                        Create lecture
                    </Typography>
                    <div className="input_fleil_box mt-3">
                        <TextField
                            onChange={(event => handleChange(event, "topicName"))}
                            type="text"
                            label="Lecture topic"
                            variant="filled"
                            className="box_vde"
                        />
                        <TextField
                            onChange={(event => handleChange(event, "sd"))}
                            type="date"
                            label="Start Date"
                            //defaultValue="02-23-2001"
                            variant="filled"
                            className="box_vde"
                            focused
                        />


                        <TextField
                            onChange={(event => handleChange(event, "st"))}
                            type="time"
                            label="Start Time"
                            variant="filled"
                            className="box_vde"
                            focused

                        />

                        <TextField
                            onChange={(event => handleChange(event, "ed"))}
                            type="date"
                            label="End Date"
                            defaultValue="02-23-2001"
                            variant="filled"
                            className="box_vde"
                            focused
                        />


                        <TextField
                            onChange={(event => handleChange(event, "et"))}
                            type="time"
                            label="End Time"
                            variant="filled"
                            className="box_vde"
                            focused

                        />

                        <div className="btn_box mt-2">
                            <button className="btn_vs_over  btn_vs_over_2v" onClick={handleCreate}>
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

export default CreateTest_btn;
