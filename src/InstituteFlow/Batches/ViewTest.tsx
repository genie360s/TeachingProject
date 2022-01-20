import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import response from "../../axios-cache-adapter/response";


export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

export default function ViewTest(props) {
    const client = useInjection<AxiosInstance>("client")
    const instituteId = useInjection<SignInDetails>("signInDetails").id

    const Attachments =(props) => {
        return (
            <button
                style={{
                    borderRadius: 30,
                    margin: 10,
                    border: 0,
                    padding: 30,
                    background: "#2697fe",
                    textAlign: "center",
                    color: "white"
                }} onClick={()=>{
                client.get(`/institute/${instituteId}/attachment/${props.id}`).then((response)=>{
                    openInNewTab(response.data['url'])
                })
            }}>
                {props.name}
            </button>
        );
    }

    //useEffect(()=>{setUrl()},[])
    return (
        <React.Fragment>
            <div className="v_callBatches mt-4">
                <div className="sylabs_text_cont" style={{textAlign: 'center'}}>
                    <div className="box_vc_nav_right box_vc_nav_right22" onClick={() => props.setViewTest(0)}>
                        <a>
                            <i className="fa fa-long-arrow-left"></i>
                        </a>
                    </div>
                    <h4>{props.data['name']}</h4>
                    <p>{props.data['description']}</p>
                </div>
                <Grid>
                    {
                        props.data.testAttachmentDetails.filter((itr) => itr.typeOfTestAttachment === "QUESTIONPAPER").map(itr => (
                            itr.attachments.map(obj => (<Attachments name={obj['name']} id={obj['id']}/>))
                        ))
                    }
                </Grid>
                <Grid>
                    <button style={{
                        fontWeight: "bolder",
                        borderRadius: 30,
                        margin: 20,
                        border: 0,
                        padding: 30,
                        background: "#FF3998",
                        textAlign: "center",
                        color: "white"
                    }}>
                        View Answers
                    </button>
                </Grid>
            </div>
        </React.Fragment>
    );
};
