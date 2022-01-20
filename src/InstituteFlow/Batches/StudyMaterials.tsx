import React, {useEffect, useState} from "react";

// import Header from "../../components/Header";
import Grid from "@mui/material/Grid";
import {useInjection} from "inversify-react";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {AxiosInstance} from "axios";
import {RefreshCourse, RefreshStudyMaterials} from "../../observables/RefreshEvents";

const StudyMaterials = (props) => {
    const client = useInjection<AxiosInstance>("client");

    const instituteId = useInjection<SignInDetails>("signInDetails").id
    const batchId = props.batchId;
    const courseId = props.courseId;

    const [studyMaterial, setStudyMaterial] = useState([{attachmentDetailsList: []}]);
    const [courseDetails, setCourseDetails] = useState({subjects: [{topics: [{}]}]})


    function fetchStudyMaterials() {
        client.get(`/institute/${instituteId}/course/${courseId}`).then(response => {
            setCourseDetails(response.data)
            console.log("course details=> ", courseDetails)
        }).catch((e) => console.log(e))
        client.get(`/institute/${instituteId}/batch/${batchId}/studyMaterial`).then(response => {
            setStudyMaterial(response.data)
            console.log(instituteId, " => ", batchId, " study material=> ", response.data)
        }).catch((e) => console.log(e))
    }

    useEffect(() => {
        fetchStudyMaterials();
        let subscription;
        subscription = RefreshStudyMaterials.subscribe(() => {
            fetchStudyMaterials();
        })
        subscription = RefreshCourse.subscribe(() => {
            fetchStudyMaterials()
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    let search = "";
    let attachmentLink = ""
    const getAttachmentById = async (id) => {
        attachmentLink = (await client.get(`/institute/${instituteId}/attachment/${id}`)).data['url']
    }

    const [selectedSubject, setSelectedSubject] = useState<String>("")
    const Types = ['IMAGE', 'VIDEO', 'PDF']
    const [selectedType, setSelectedType] = useState<number>(0)
    const selectionType = ['Image', 'Videos', 'PDFs'];
    const iconClass = ["fa fa-image", "fa fa-video-camera", "fa fa-file-text"]

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <React.Fragment>
            <div className="v_callBatches mt-4">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <div className="box_nav_side_bar">
                            {
                                courseDetails['subjects'].map(itr => (
                                    <button onClick={(e) => {
                                        setSelectedSubject(itr['id']);
                                        props.subjectId(itr['id'])
                                    }}
                                            className={(selectedSubject == itr['id']) ? "active_btns" : ""}>{itr['name']}</button>
                                ))
                            }
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="box_nav_bach">
                            {
                                selectionType.map((itr, i) => (
                                    <button onClick={() => setSelectedType(i)}
                                            className={selectedType === i ? "active_btns" : ""}>{itr}</button>
                                ))
                            }
                        </div>

                        <div className="search_box">
                            <input onChange={(e) => {
                                search = e.target.value;
                            }} type="search" placeholder="Search Somthings"/>
                            <button>
                                <i className="fa fa-search"/>
                            </button>
                        </div>


                        <div className="studyMari_d">

                            {
                                studyMaterial.filter((itr) => itr['subjectId'] === selectedSubject).map(itr => (
                                    itr.attachmentDetailsList.filter((itr) => itr['attachmentType'] === Types[selectedType]).map(obj => (

                                            <div className="study_inner" onClick={async () => {
                                                await getAttachmentById(obj['id']);
                                                openInNewTab(attachmentLink);
                                            }}>
                                                <div className="box_vc_study">
                                                    <i className={iconClass[selectedType]}></i>
                                                </div>
                                                <div className="text_study">
                                                    <p>
                                                        {obj['name']}
                                                    </p>
                                                </div>


                                            </div>
                                        )
                                    )
                                ))
                            }

                        </div>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default StudyMaterials;
