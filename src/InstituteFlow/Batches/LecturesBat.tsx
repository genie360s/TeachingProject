
import React from "react";
import LecturesSubc from "../Dashboard/LecturesSubc";

const LecturesBat = (props) => {
  return (
    <React.Fragment>
        <div className="v_callBatches mt-4">
         <LecturesSubc instituteId={props.instituteId} batchId={props.batchId}/>
        </div>
    </React.Fragment>
  );
};

export default LecturesBat;