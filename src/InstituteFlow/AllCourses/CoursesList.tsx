import React from "react";
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import {useNavigate} from "react-router-dom";

const CoursesList = (props) => {
    let navigate = useNavigate();

    return (
        <React.Fragment>
            <div className="class_ver">
                <div className="box_alss_ver">
                    <h4>{props.liTitle}</h4>
                </div>

                <div className="box_alss_ver2 box_alss_ver2xd">
                    <button
                        onClick={() => {
                            navigate("/course", {state:{courseId: props.courseId}})
                        }}
                        style={{marginRight: "15px"}}><FileOpenIcon sx={{width: "18px", marginRight: "14px"}}/>Enter
                    </button>
                    <button onClick={() => {//console.log("=>"+props.courseId)
                        navigate("/course_batches", {state: {courseId: props.courseId}})
                    }}><LocalPoliceIcon sx={{width: "18px", marginRight: "14px"}}/>view batches
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CoursesList;

