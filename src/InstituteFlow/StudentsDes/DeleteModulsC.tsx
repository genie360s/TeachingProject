import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {RefreshBatchStudentsAndTeachers, RefreshStudentsAndTeachers} from "../../observables/RefreshEvents";


const DeleteModulsC = (props) => {

    const client = useInjection<AxiosInstance>("client");
    const signInDetails = useInjection<SignInDetails>("signInDetails");
    console.log("=>>>>" + signInDetails.id)

    const instituteDeleteHandler = () => {
        //var varity = props.verifys;
        let id = props.ids;

        console.log(id);

        client.delete(`/institute/${signInDetails.id}/${props.verifys}/` + id).then((response) => {
            props.closemode();
            RefreshStudentsAndTeachers.next()
            console.log(response.data)
        }).catch(function (error) {
            console.log("ERROR is : " + error);
        });

    }

    const batchDeleteHandler = () => {
        var varity = props.verifys;
        let id = props.ids;
        console.log(id);
        client.delete(`/institute/${signInDetails.id}/batch/${props.batchId}/${props.verifys}/` + id).then((response) => {
            props.closemode();
            RefreshBatchStudentsAndTeachers.next()
            console.log(response.data)
        }).catch(function (error) {
            console.log("ERROR is : " + error);
        });

    }


    return (
        <div>
            {
                //console.log(props)
            }
            <Modal
                open={props.open_mode}
                onClose={() => props.closemode()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="box_del">
                    <div className='modeL_style'>
                        <h6>Do you want to delete “{props.name}” ?</h6>
                        {/*<span>After deleting the thread, you can no longer go it</span>*/}

                        <div className="btn_box btn_box_vdc">
                            <button className="btn_vs_over clorv2" onClick={() => props.closemode()}>
                                No, Keep it
                            </button>
                            <button className="btn_vs_over clorv"
                                    onClick={(props.batchId === undefined) ? instituteDeleteHandler : batchDeleteHandler}>
                                Yes, Delete it
                            </button>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default DeleteModulsC;