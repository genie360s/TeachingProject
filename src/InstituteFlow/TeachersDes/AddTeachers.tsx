import React from "react";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";

import Typography from "@mui/material/Typography";


export const AddTeachers = (props) => {


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
                        Add Teacher
                    </Typography>
                    <div className="input_fleil_box mt-3">


                        <TextField
                            defaultValue="Hamed Hakimi"
                            type="text"
                            label="Lecture topic"
                            variant="filled"
                            className="box_vde"
                        />
                        <TextField

                            type="number"
                            label="Start Date"
                            defaultValue="+98 903 965 0049"
                            variant="filled"
                            className="box_vde"
                            focused
                        />


                        <div className="btn_box mt-2">
                            <button className="btn_vs_over  btn_vs_over_2v">
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
