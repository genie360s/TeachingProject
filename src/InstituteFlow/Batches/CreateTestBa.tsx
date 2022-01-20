import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import {useInjection} from "inversify-react";
import axios, {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import DeleteIcon from "@mui/icons-material/Delete";
import {generateId} from "../AllCourses/AddCourses";
import {RefreshTests} from "../../observables/RefreshEvents";


const exclient = axios.create({baseURL: 'https://teachingaura-dk6fq7sbfa-uc.a.run.app/api/'});

async function uploadFile(url, file) {
    await exclient.put(url,
        file, {
            headers: {
                'Content-Type': file['type']
            }
        }
    );
}

let finalData = {
    batchId: "string",
    description: "string",
    endTime: 0,
    id: "string123",
    name: "string",
    startTime: 0,
    testAttachmentDetails: [
        {
            attachments: [],
            id: "",
            typeOfTestAttachment: "QUESTIONPAPER"
        }
    ]
}

const CreateTestBa = (props) => {
    const instituteId = useInjection<SignInDetails>("signInDetails").id
    const Input = styled("input")({
        display: "none",
    });

    const [user, setUser] = useState({
        name: '', description: '', startTime: '', startDate: '', endTime: '', endDate: ''
    })

    const [allAttachments, setAllAttachments] = useState([])
    const dateTime = (date, time) => {
        return Date.parse(date + " " + time)
    }
    const convertListOfAttachmentToTestAttachment = () => {
        return {
            attachments: allAttachments,
            id: generateId(),
            typeOfTestAttachment: "QUESTIONPAPER"
        }
    }
    const sumiHandle = () => {
        finalData.startTime = dateTime(user.startDate, user.startTime)
        finalData.endTime = dateTime(user.endDate, user.endTime)
        finalData.id = generateId()
        finalData.description = user.description
        finalData.name = user.name
        finalData.testAttachmentDetails = [convertListOfAttachmentToTestAttachment()]

        console.log(finalData)

        client.post(`/institute/${instituteId}/batch/${props.batchId}/test`, finalData).then((response) => {
            setUser({name: '', description: '', startTime: '', startDate: '', endTime: '', endDate: ''})
            RefreshTests.next()
            console.log("test uploaded => ", response.data)
            props.setBover(1)

        }).catch(e => console.log(e))

    }
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]: value})
        console.log(user)

    }

    const client = useInjection<AxiosInstance>("client");


    let listOfAttachments;
    const uploadAttachment = async (files) => {
        listOfAttachments = [];

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
                        console.log(`data itr=> ${itr} `, listOfAttachments)
                    })
                }).catch((e) => console.log(e))
            }).catch((e) => console.log(e))
        }
        const temp = listOfAttachments.concat(allAttachments)
        await setAllAttachments(temp)
        await console.log(allAttachments)

    }
    const deleteAttachment = async (e, id) => {
        setAllAttachments(allAttachments.filter((itr) => itr['id'] != id))
    }

    const UploadedFiles = (props) => {
        return (
            <div style={{background: "white", borderRadius: 30, padding: 10, marginTop: 5, marginBottom: 5}}
                 className="obx_co">
                <Grid item xs={10} style={{textAlign: "center"}}>{props.name}</Grid>
                <Grid item xs={1} style={{justifyContent: "center"}}>
                    <button>
                        <DeleteIcon
                            onClick={(e) => (deleteAttachment(e, props.id))}
                            sx={{color: "#fff", width: "14px"}}
                        />
                    </button>
                </Grid>
                <Grid item xs={1} style={{justifyContent: "center"}}/>
            </div>

        );
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputs}
                        label="Test Name"
                        variant="filled"
                        className="box_vde"
                    />
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        type="text"
                        value={user.description}
                        onChange={handleInputs}
                        name="description"
                        label="Test Description"
                        variant="filled"
                        className="box_vde"
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        type="time"
                        value={user.startTime}
                        onChange={handleInputs}
                        name="startTime"
                        label="Start Time"
                        variant="filled"
                        className="box_vde"
                        focused
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField

                        type="date"
                        label="Start Date"
                        name="startDate"
                        value={user.startDate}
                        onChange={handleInputs}
                        variant="filled"
                        className="box_vde"
                        focused
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField

                        type="time"
                        value={user.endTime}
                        name="endTime"
                        onChange={handleInputs}
                        label="End Time"
                        variant="filled"
                        className="box_vde"
                        focused
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField

                        type="date"
                        name="endDate"
                        value={user.endDate}
                        onChange={handleInputs}
                        label="End Date"
                        variant="filled"
                        className="box_vde"
                        focused
                    />
                </Grid>

                <Grid item xs={3}>
                    <label htmlFor="contained-button-file" className="btnx_hede2dc">
                        <Input
                            accept="*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={(e) => uploadAttachment(e.target.files)}
                        />
                        <Button variant="contained" component="span" className="btnx_hede ">
                            <CreateNewFolderIcon sx={{marginRight: "10px"}}/> Upload Test
                        </Button>
                    </label>

                    {
                        allAttachments.map((itr) => (
                            <UploadedFiles name={itr['name']} id={itr['id']}/>
                        ))
                    }


                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} className="mavde">
                        <Grid item xs={4}>
                            <button className="btn_custond" onClick={sumiHandle}>Add</button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CreateTestBa;
