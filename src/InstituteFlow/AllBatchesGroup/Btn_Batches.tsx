import React from "react";
import {useNavigate} from "react-router-dom";


const Btn_Batches = (props) => {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <div className="mb-4">
                <h4>{props.data[0]['courseName']}</h4>
                <div className="box_btn_liike">
                    {
                        props.data.map((itr) => (
                            <a onClick={() => {
                                //console.log(itr.id);
                                navigate("/batch", {state: {batchId: itr.id,courseId:props.data[0]['courseId']}})
                            }}
                               className="color2_ba">{itr['name']}
                            </a>)
                        )
                    }
                </div>
            </div>


        </React.Fragment>

    );
};

export default Btn_Batches;
