import React, {useEffect, useState} from "react";
import HeadSub from "../../components/HeadSub";

// icon
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupUser from '@mui/icons-material/Group';

// import Header from "../../components/Header";
import Side_Menu from "../../components/Side_Menu";
import TestBatches from "./TestBatches";
import StudyMaterials from "./StudyMaterials";
import LecturesBat from "./LecturesBat";
import StudentsTeachers from "./StudentsTeachers";
import AddTeachersx from "./AddTeachersx";
import AddStudents from "./AddStudents";
import CreateTest_btn from "./CreateTest_btn";
import EditCourse from "./EditCourse";
import CreateTestBa from "./CreateTestBa";
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {makeAutoObservable} from "mobx";
import SyllabusBatch from "./SyllabusBatch";
import {UploadStudyMaterial} from "./UploadStudyMaterial";
import ViewTest from "./ViewTest";


export class BatchDetails {
    courseId: String;
    courseName: String;
    id: String;
    instituteId: String;
    name: String;
    startDate: Number;

    constructor() {
        makeAutoObservable(this)
        this.courseId = ""
        this.courseName = ""
        this.id = ""
        this.name = ""
        this.instituteId = ""
        this.startDate = 0
    }
}

export const BatchesTest = (props) => {

    const navigate = useNavigate();

    const signInDetails = useInjection<SignInDetails>("signInDetails")

    const navigationParam = useLocation().state

    //console.log(navigationParam)
    const client = useInjection<AxiosInstance>("client");


    const [batchData, setbatchData] = useState({});
    //console.log("batch Id => " + navigationParam.batchId)


    const techerDat = () => {
        client.get('/institute/' + signInDetails.id + '/batch/' + navigationParam.batchId).then(response => {
            setbatchData(response.data)
        })
        //console.log(batchData)
    }
    useEffect(() => {
        techerDat()
    }, [])

    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const handleClose = () => {
        setAddDialogOpen(false);
    };


    const [subjectId,setSubjectId]=useState(undefined);
    const handleSubjectId=(e)=>{
        setSubjectId(e)
        console.log("subject id=> ",e)
    }

    const Avsc = (props) => {

        switch (props.logic) {
            case 1:
                return (
                    <button onClick={() => setBover(5)} className={"btnx_hede"} style={{display:(Bover===1)?"block":"none"}}>
                        <AddIcon/>
                        <span>Create Test</span>
                    </button>
                );
                break;
            case 2:
                return (
                    <UploadStudyMaterial batchId={navigationParam.batchId} subjectId={subjectId}/>
                );
                break;

            case 3:
                return (<button className="btnx_hede" onClick={() => setBover(4)} style={{display:(Bover===1)?"block":"none"}}>
                        <EditIcon/>
                        <span>Edit Course</span>
                    </button>

                );
                break;


            case 4:
                return (
                    <button className="btnx_hede" onClick={() => setAddDialogOpen(true)}>
                        <AddIcon/>
                        <span>Create lecture</span>
                    </button>
                );
                break;

            case 5:
                return (
                    <>
                        <button className="btnx_hede" onClick={() => setBover(2)}>
                            <AccountBoxIcon/>


                        </button>

                        <button className="btnx_hede" onClick={() => setBover(3)}>
                            <GroupUser/>

                        </button>
                    </>
                );
                break;

            default:
                return (
                    <></>
                )


        }


    }
    const [BatchesView, setBatches] = useState(1);

    const [Bover, setBover] = useState(1);

    return (
        <React.Fragment>

            <div className="content_full_container box_ladto">
                <Side_Menu/>
                <div className="content_box content_box22">
                    <header className="heder_nav  ">
                        <div className="box_vc_nav_right box_vc_nav_right22">
                            <a onClick={()=>Bover===1?navigate(-1):setBover(1)}>
                                <i className="fa fa-long-arrow-left"></i>
                            </a>
                            <h4>{batchData['name']}</h4>
                            <span>{batchData['courseName']}</span>
                        </div>
                        <div className="box_vc_nav_left">
                            <Avsc logic={BatchesView}/>

                            <HeadSub/>
                        </div>
                    </header>

                    <div className="conte_box_deboard ">
                        <div className="conte_box_deboard_inner">
                            {/* root box start*/}

                            <div className={Bover === 1 ? "d_blocks" : "d_nones"}>

                                <div className="box_nav_bach">
                                    <button className={BatchesView === 1 ? "active_btns" : ""}
                                            onClick={() => setBatches(1)}>Test
                                    </button>
                                    <button className={BatchesView === 2 ? "active_btns" : ""}
                                            onClick={() => setBatches(2)}>Study Materials
                                    </button>
                                    <button className={BatchesView === 3 ? "active_btns" : ""}
                                            onClick={() => setBatches(3)}>Syllabus
                                    </button>
                                    <button className={BatchesView === 4 ? "active_btns" : ""}
                                            onClick={() => setBatches(4)}>Lectures
                                    </button>
                                    <button className={BatchesView === 5 ? "active_btns" : ""}
                                            onClick={() => setBatches(5)}>Students & Teachers
                                    </button>
                                </div>


                                <div className={BatchesView === 1 ? "d_blocks" : "d_nones"}>
                                    <TestBatches batchId={navigationParam.batchId}/>
                                </div>

                                <div className={BatchesView === 2 ? "d_blocks" : "d_nones"}>
                                    <StudyMaterials batchId={navigationParam.batchId}
                                                    courseId={navigationParam.courseId}
                                                    subjectId={(e)=>handleSubjectId(e)}
                                    />

                                </div>

                                <div className={BatchesView === 3 ? "d_blocks" : "d_nones"}>
                                    <SyllabusBatch courseId={navigationParam.courseId}/>
                                </div>
                                <div className={BatchesView === 4 ? "d_blocks" : "d_nones"}>
                                    <LecturesBat batchId={navigationParam.batchId}/>
                                </div>
                                <div className={BatchesView === 5 ? "d_blocks" : "d_nones"}>
                                    <StudentsTeachers batchId={navigationParam.batchId}/>
                                </div>

                            </div>

                            <div className={Bover === 2 ? "d_blocks" : "d_nones"}>
                                <AddTeachersx batchId={navigationParam.batchId} setBover={setBover}/>
                            </div>

                            <div className={Bover === 3 ? "d_blocks" : "d_nones"}>
                                <AddStudents batchId={navigationParam.batchId} setBover={setBover}/>
                            </div>

                            <div className={Bover === 4 ? "d_blocks" : "d_nones"}>
                                <EditCourse {...{courseId:navigationParam.courseId,bover:setBover}}/>
                            </div>
                            <div className={Bover === 5 ? "d_blocks" : "d_nones"}>
                                <CreateTestBa batchId={navigationParam.batchId} setBover={setBover}/>
                            </div>


                            {/* root box end*/}
                        </div>
                    </div>
                </div>
            </div>
            <CreateTest_btn open_log={addDialogOpen} closevc={handleClose} batchData={batchData}/>
        </React.Fragment>


    );

};


//export default BatchesTest;
