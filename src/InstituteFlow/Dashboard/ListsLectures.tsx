import React from "react";
import {useNavigate} from "react-router-dom";


const ListsLectures = (props) => {

    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className="class_ver">
                <div className="box_alss_ver">
                    <h4>{props.liTitle}</h4>
                    <span>
            <i className="fa fa-calendar"></i>
                        {props.liDate}
          </span>
                    <span>
            <i className="fa fa-clock-o"></i> {props.liStartTime}
          </span>
                    {/*key={["id"]}*/}

                    <span>
            <i className="fa fa-clock-o"></i> {props.liEndTime}
          </span>

                </div>

                <div className="box_alss_ver2">
                    {/*<button onClick={() => navigate("/batch", {state: {batchId: props.batchId, courseId: props.courseId}})}>*/}
                        <button className={"batch_Box"} onClick={() => navigate("/batch", {state: {batchId: props.batchId, courseId: props.courseId}})} style={{background: props.liNotsColor,borderRadius:10,padding:15,paddingBottom:10,paddingTop:10,marginRight:30}}>
                            {props.liAcCode}
                            <br/>
                            {props.courseName}
                        </button>
                    {/*</button>*/}
                    <button style={{borderRadius:30}} onClick={event => window.location.href = props.liZoomL}>Enter</button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ListsLectures;
