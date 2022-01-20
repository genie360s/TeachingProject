import SyllabusBatch from "../Batches/SyllabusBatch";
import React, {useEffect, useState} from "react";
import {useInjection} from "inversify-react";
import Side_Menu from "../../components/Side_Menu";
import HeadSub from "../../components/HeadSub";
import EditCourse from "../Batches/EditCourse";
import CreateTest_btn from "../Batches/CreateTest_btn";
import {AxiosInstance} from "axios";
import EditIcon from "@mui/icons-material/Edit";
import {useLocation, useNavigate} from "react-router-dom";
import {SignInDetails} from "../../LoginFlow/SignInDetails";

export default function CourseSyllabus(props) {
    const courseId = useLocation().state.courseId
    //console.log(courseId)

    const instituteId = useInjection<SignInDetails>("signInDetails").id

    const client = useInjection<AxiosInstance>("client");

    const [batchData, setbatchData] = useState({});
    const techerDat = async () => {
        const data = (await client.get('/institute/' + instituteId + '/course/' + courseId)).data;
        //console.log(data)
        setbatchData(data)
    }
    useEffect(() => {
        techerDat()
    }, [])

    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const handleClose = () => {
        setAddDialogOpen(false);
    };


    const Avsc = (props) => {
        return (
            <button className="btnx_hede" onClick={() => setBover(4)} style={{display:(Bover===1)?"block":"none"}}>
                <EditIcon/>
                <span>Edit Course</span>
            </button>
        );
    }
    const [BatchesView, setBatches] = useState(3);

    const [Bover, setBover] = useState(1);

    const navigate=useNavigate()
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
                            <h4 style={{borderRight: 0}}>{batchData['name']}</h4>
                        </div>
                        <div className="box_vc_nav_left">
                            <Avsc logic={BatchesView}/>
                            <HeadSub/>
                        </div>
                    </header>

                    <div className="conte_box_deboard ">
                        <div className="conte_box_deboard_inner">
                            <div className={Bover === 1 ? "d_blocks" : "d_nones"}>
                                <div className={"d_blocks"}>
                                    <SyllabusBatch courseId={courseId}/>
                                </div>
                            </div>

                            <div className={Bover === 4 ? "d_blocks" : "d_nones"}>
                                <EditCourse {...{courseId:courseId,bover:setBover}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateTest_btn open_log={addDialogOpen} closevc={handleClose} batchData={batchData}/>
        </React.Fragment>


    );
}