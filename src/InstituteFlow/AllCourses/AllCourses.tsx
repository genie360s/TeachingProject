import React, {useEffect, useState} from "react";
import HeadSub from "../../components/HeadSub";

// icon
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

// import Header from "../../components/Header";
import Side_Menu from "../../components/Side_Menu";
import CoursesList from "./CoursesList";
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import AddCourses from './AddCourses';
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {RefreshCourse} from "../../observables/RefreshEvents";


const AllCourses = () => {

    const [courseData, setCourseData] = React.useState([]);


    const client = useInjection<AxiosInstance>("client");

    const instituteId = useInjection<SignInDetails>("signInDetails").id
    const techerDat = () => {
        client.get(`/institute/${instituteId}/course`).then((response) => {
            //console.log("Response for dummy is " + response.data);

            const dataT = response.data;
            setCourseData(dataT);
            // console.log(JSON.stringify(dataT)+"target data")

        }).catch(function (error) {
            //console.log("ERROR is : " + error);
        });
    }

    useEffect(() => {
        techerDat();
        const subscription = RefreshCourse.subscribe(() => {
            techerDat();
        })
        return () => {
            subscription.unsubscribe()
        }
    }, []);


    const [Bover, setBover] = useState(1);


    return (

        <React.Fragment>
            <div className="content_full_container box_ladto ">
                <Side_Menu/>
                <div className="content_box content_box22">
                    <header className="heder_nav">
                        <div className={Bover===2?"box_vc_nav_right box_vc_nav_right22":"d_nones"}>
                            <a onClick={()=>Bover===2?setBover(1):Bover}>
                                <i className="fa fa-long-arrow-left"></i>
                            </a>
                            {/*<h4 style={{borderRight: 0}}>{batchData['name']}</h4>*/}
                        </div>

                        <div className='box_vc_nav_right'>
                            <h4>All Courses</h4>
                        </div>
                        <div className="box_vc_nav_left">
                            <button className={Bover===1?"btnx_hede":"d_nones"} onClick={() => setBover(2)}>
                                <CreateNewFolderIcon/>
                                <span>Add Course</span>
                            </button>

                            <HeadSub/>
                        </div>
                    </header>

                    <div className="conte_box_deboard ">
                        <div className="conte_box_deboard_inner">
                            {/* root box start*/}


                            <div className={Bover === 1 ? "d_blocks" : "d_nones"}>
                                <div className="className_over_view_con mt-3">

                                    {

                                        courseData.map((userData, index) => (
                                            <CoursesList
                                                key={userData['id']}
                                                courseId={userData['id']}
                                                liTitle={userData['name']}
                                            />

                                        ))
                                    }

                                </div>
                            </div>
                            <div className={Bover === 2 ? "d_blocks" : "d_nones"}>
                                <AddCourses {...{setBover:setBover}}/>
                            </div>

                            {/* root box end*/}
                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment>

    );
};

export default AllCourses;
