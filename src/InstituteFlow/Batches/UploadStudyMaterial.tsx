import Button from "@mui/material/Button";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import React, {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import {useInjection} from "inversify-react";
import axios, {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {generateId} from "../AllCourses/AddCourses";
import {RefreshStudyMaterials} from "../../observables/RefreshEvents";

const exclient = axios.create({baseURL: 'https://teachingaura-dk6fq7sbfa-uc.a.run.app/api/'});

async function uploadFile(url, file) {
    //console.log("step4", file)
    await exclient.put(url,
        file, {
            headers: {
                'Content-Type': file['type']
            }
        }
    );
}

export const UploadStudyMaterial = (props) => {

    const client = useInjection<AxiosInstance>("client")
    const instituteId = useInjection<SignInDetails>("signInDetails").id

    const createStudyMaterial = (list) => {
        //console.log("late chala")
        client.post(`/institute/${props.instituteId}/batch/${props.batchId}/studyMaterial`, {
            id: generateId(),
            name: "",
            subjectId: props.subjectId,
            attachmentDetailsList: list
        }).then(response => {
            RefreshStudyMaterials.next()
            //console.log("study material => ", response.data)
        }).catch(e => console.log(e))
    }
    var listOfAttachments: any[] = [];
    const uploadAttachment = async (files) => {
        listOfAttachments=[]

        console.log("files=> ", files)
        for (let itr = 0; itr < files.length; itr++) {
            let data = {
                attachmentType: "",
                id: generateId(),
                name: files[itr]['name'],
                url: "",
            }

            console.log("step1")
            if (files[itr]['type'].includes('pdf')) {
                data.attachmentType = 'PDF'
            } else if (files[itr]['type'].includes('image')) {
                data.attachmentType = 'IMAGE'
            } else if (files[itr]['type'].includes('video')) {
                data.attachmentType = 'VIDEO'
            } else {
                console.log("invalid type")
                return;
            }

            await client.post(`/institute/${instituteId}/attachment/upload-url`, data).then(async (response) => {
                data.url = response.data['url']
                await uploadFile(data.url, files[itr]).then(async (r) => {
                    await client.get(`/institute/${instituteId}/attachment/${data.id}`).then(async (response) => {
                        data.url = response.data['url']
                        listOfAttachments.push(response.data)
                        if (itr === files.length - 1) {
                            await createStudyMaterial(listOfAttachments)
                        }
                    })
                }).catch((e) => console.log(e))
            }).catch((e) => console.log(e))

        }
    }

    const Input = styled("input")({
        display: "none",
    });

    return (
        <label
            htmlFor="contained-button-file"
            className="btnx_hede"
            style={{marginBottom: 0, marginLeft: 0, marginRight: 10, background: 'transparent'}}
        >
            <Input
                accept="*"
                id="contained-button-file"
                multiple
                type="file"
                disabled={props.subjectId === undefined}
                onChange={(e) => {
                    if (e.target.files != null) {
                        console.log("Attemptintg to upload files");
                        uploadAttachment(e.target.files)
                    }
                }}
            />
            <Button
                variant="contained"
                component="span"
                className="btnx_hede"
                style={{marginLeft: 0, padding: 20, width: "fit-content", borderRadius: 15, background: "#FF3998"}}
            >
                <CreateNewFolderIcon/>
                <span>Upload Content</span>

            </Button>

        </label>
    );
}