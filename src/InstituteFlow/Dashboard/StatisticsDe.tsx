import React from "react";

const StatisticsDe = (props) => {
  return (
    <React.Fragment>
      <div className="di_fle_box">
        <h4>
          {props.staValue}
          <div className={props.staColor ? "vx_b colo_1" : "vx_b colo_2"}>{props.staGra}</div>
        </h4>
        <span>{props.staName}</span>
      </div>
      <div className={props.staBorder ? "border_vs" : "d-none"}></div>

     
    </React.Fragment>
  );
};

export default StatisticsDe;
