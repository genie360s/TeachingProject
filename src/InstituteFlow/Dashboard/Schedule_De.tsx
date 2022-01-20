import React from "react";
import Grid from '@mui/material/Grid';

const Schedule_De = (props) => {
  return (
    <React.Fragment>
      <Grid item xs={3}>
        <div className={props.s_active?"box_rial_card box_r_activ" : "box_rial_card"}>
          <h4>{props.s_value}</h4>
          <span>{props.s_name}</span>
          <div className={props.s_show ? "box_dv_r" : "d-none"}>L</div>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default Schedule_De;
