import React, {useEffect, useState} from "react";
import HeadSub from "../../components/HeadSub";

// icon
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';


import Side_Menu from "../../components/Side_Menu";
import Btn_Batches from "./Btn_Batches";
import AddBatchBtn from "./AddBatchBtn";
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {useLocation, useNavigate} from "react-router-dom";
import {RefreshBatches} from "../../observables/RefreshEvents";


const AllBatches = (props) => {


    const courseParam = useLocation().state
    let courseId = undefined;
    try {
        courseId = courseParam.courseId
    } catch (e) {
        console.log('courseId not defined')
    }
    console.log(courseParam + " -> " + courseId)

    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [AllBatches, setAllBatches] = useState([]);
    const signInDetails = useInjection<SignInDetails>("signInDetails")

    const [courseDetails, setcourseDetails] = useState({});


    const handleClose = (props) => {
        setAddDialogOpen(false);
    };

    const client = useInjection<AxiosInstance>("client");

    const handling = async () => {
        setAllBatches((await client.get(`/institute/${signInDetails.id}/batch`)).data.filter(function (itr) {
            return itr['courseId'] == courseId
        }));
        setcourseDetails((await client.get(`/institute/${signInDetails.id}/course/${courseId}`)).data);
        console.log(JSON.stringify(courseDetails, null, 4))

    }
    const getData = async () => {
        console.log("ye rhi id => " + courseId);
        (courseId === undefined) ?
            setAllBatches((await client.get(`/institute/${signInDetails.id}/batch`)).data) : await handling();
    }

    const CategoriseData = () => {
        //setLiveCourse()

        return {
            LiveBatches: AllBatches.filter(function (itr) {
                return itr['startDate'] <= Date.now()
            }),
            UpcomingBatches: AllBatches.filter(function (itr) {
                return itr['startDate'] > Date.now()
            }),
            LiveCourses: Array.from(new Set(AllBatches.filter(function (itr) {
                return itr['startDate'] <= Date.now()
            }).map(itr => itr['courseId']))),
            UpcomingCourses: Array.from(new Set(AllBatches.filter(function (itr) {
                return itr['startDate'] > Date.now()
            }).map(itr => itr['courseId'])))
        };
    }

    useEffect(() => {
        getData()
        const subscription = RefreshBatches.subscribe(() => {
            getData();
        })
        return () => {
            subscription.unsubscribe()
        }
        console.log(AllBatches)
    }, []);


    const courseIds = Array.from(new Set(AllBatches.map(itr => itr['courseId'])));
    console.log(courseIds);

    const navigate=useNavigate()

    return (
        <React.Fragment>
            {console.log(CategoriseData())}
            <div className="content_full_container box_ladto">
                <Side_Menu/>
                <div className="content_box content_box22">
                    <header className="heder_nav  ">
                        <div className="box_vc_nav_right box_vc_nav_right22">
                            <a onClick={()=>navigate(-1)} style={{visibility:(courseId===undefined)?"hidden":"visible"}} >
                                <i className="fa fa-long-arrow-left"></i>
                            </a>
                            {
                                (courseId !== undefined) ? (<><h4>All Batches</h4>
                                        <span>{courseDetails['name']}</span></>) :
                                    <h4 style={{borderRight: 0}}>All Batches</h4>
                            }
                        </div>

                        <div className="box_vc_nav_left">
                            <button className="btnx_hede" onClick={() => setAddDialogOpen(true)}>
                                <CreateNewFolderIcon/>
                                <span>Add Batches</span>
                            </button>

                            <HeadSub/>
                        </div>
                    </header>


                    <div className="conte_box_deboard ">
                        <div className="conte_box_deboard_inner">

                            <div className=" box_vd_contsiner ">
                                <div className="teit_all">
                                    <h4>Live Batches</h4>
                                    <div className="box_vd_s_continer">
                                        {
                                            CategoriseData().LiveCourses.map((itr, i) => (
                                                <Btn_Batches
                                                    data={CategoriseData().LiveBatches.filter((obj) => (obj['courseId'] == itr))}/>))
                                        }

                                    </div>

                                </div>
                                <div className="teit_all">
                                    <h4>Upcoming Batches</h4>
                                    <div className="box_vd_s_continer">
                                        {
                                            CategoriseData().UpcomingCourses.map((itr, i) => (
                                                <Btn_Batches
                                                    data={CategoriseData().UpcomingBatches.filter((obj) => (obj['courseId'] == itr))}/>))
                                        }
                                    </div>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <AddBatchBtn open_log={addDialogOpen} closevc={handleClose}/>

        </React.Fragment>

    )
        ;
};

export default AllBatches;
