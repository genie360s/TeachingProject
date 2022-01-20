import React from "react";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";

import Typography from "@mui/material/Typography";
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {RefreshStudentsAndTeachers} from "../../observables/RefreshEvents";

const AddStudent = (props) => {
    const client = useInjection<AxiosInstance>("client");

    const SendInvite = (e) => {
        //console.log(props.data)
        props.closevc()
        client.post(`/institute/${props.instituteId}/invite/${props.entity.toLowerCase()}`, props.data).then(response => {
                //console.log(JSON.stringify(response.data));
                RefreshStudentsAndTeachers.next()
            }
        ).catch(e => {
            //console.log("error" + e)
        })
        //window.location.reload();
    }
    const HandleName = (e) => {
        props.data.name = e.target.value;
        //console.log(props.data.name);
    }
    const HandleNumber = (e) => {
        props.data.contactNumber = "+91" + e.target.value;
        //console.log(props.data.contactNumber);
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
                        Invite {props.entity}
                    </Typography>
                    <div className="input_fleil_box mt-3">


                        <TextField
                            type="text"
                            label={`${props.entity} Name`}
                            variant="filled"
                            className="box_vde"
                            onChange={HandleName}
                        />
                        <TextField
                            type="number"
                            label="Mobile Number"
                            variant="filled"
                            className="box_vde"
                            onChange={HandleNumber}
                        />

                        <div className="btn_box mt-2">
                            <button className="btn_vs_over  btn_vs_over_2v" onClick={SendInvite}>
                                Send invite
                            </button>

                        </div>
                    </div>
                </div>
            </Dialog>
            ;
        </>
    );
};

export default AddStudent;
