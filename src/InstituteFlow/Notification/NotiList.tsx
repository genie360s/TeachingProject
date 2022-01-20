import React, { useState } from "react";
import HeadSub from "../../components/HeadSub";

import FileOpenIcon from '@mui/icons-material/FileOpen';


// Accodina
import { withStyles } from "@mui/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
// import Header from "../../components/Header";
import Grid from "@mui/material/Grid";
import Side_Menu from "../../components/Side_Menu";



import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// Accodiantion


const Accordion = withStyles({
    root: {
      backgroundColor: "#fff",
      borderRadius: "15px",
      marginTop: "20px",
      marginBottom: "20px",
      boxShadow: "0px 0px 20px #0001",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: "auto",
      },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: "#2697fe",
      marginBottom: -1,
      padding: "10px 20px",
  
      color: " #fff",
  
      borderRadius: 15,
  
      minHeight: 56,
      "&$expanded": {
        minHeight: 56,
        borderRadius: 15,
      },
    },
    content: {
      "&$expanded": {
        margin: "12px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      borderRadius: 15,
      display: "flex",
      padding:"20px",
    },
  }))(MuiAccordionDetails);
  

const NotiList = (props) => {

     // Accodiantion 

    const [expanded, setExpanded] = React.useState("list1");

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

     // Accodiantion End
  
  return (
    <React.Fragment>
        <div className="v_callBatches">
             
              <div>
                <Accordion
                  square
                  expanded={expanded === props.list}
                  onChange={handleChange(props.list)}
                  className="accoditon_vs accoditon_vs_2"
                >
                  <AccordionSummary
                    expandIcon={
            <ArrowDropDownIcon style={{ color: "#fff", fontSize: "30px" }} />
          }
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <div className= {expanded === props.list? "acodition_title2" : "acodition_title"}>
                     <div className={expanded === props.list? "bxd2" : "bxd"}>
                     <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        ut aliquam, purus sit amet luctus venenatis, lectus
                        magna fringilla urna, porttitor rhoncus dolor purus non
                        enim praesent elementum facilisis leo, vel
                      </p>
                     </div>
                      
                      <div className="btn_box ">
                        <button className=" btn_vs_overNot">

                        New_chat_for_ps.jpg
                        <FileOpenIcon sx={{marginLeft:"10px" , width:"18px"}}/>
                        </button>
                        <button className=" btn_vs_overNot">

                        New_chat_for_ps.jpg
                        <FileOpenIcon sx={{marginLeft:"10px" , width:"18px"}}/>
                        </button>
                      </div>
                    
                    </div>
                  </AccordionSummary>
                  
                 
                </Accordion>
              </div>
              </div>
    </React.Fragment>
  );
};

export default NotiList;
