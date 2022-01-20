import React, {useEffect, useState} from "react";


// Accodina
import {withStyles} from "@mui/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Popover from '@mui/material/Popover';

import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {Bolt, FormatItalic} from "@mui/icons-material";
import {RefreshBatchStudentsAndTeachers, RefreshCourse} from "../../observables/RefreshEvents";

// import Header from "../../components/Header";
// import Grid from "@mui/materialGrid";


// Accodiantion

const Accordion = withStyles({
    root: {
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
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
        backgroundColor: "#EEEEEE",
        marginBottom: -1,
        padding: "15px 20px",
        color: " #333",
        borderRadius: 15,
        display: "block",

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
        padding: "20px 20px 10px 20px",

    },
}))(MuiAccordionDetails);


// Accodiantion End


const SyllabusBatList = (props) => {


//  apis Call


    const [topicData, setTopicData] = React.useState([]);


    //console.log(JSON.stringify(topicData) + "topics");

    //console.log(topicData);


    const client = useInjection<AxiosInstance>("client");

    const techerDat = () => {
        client.get("/institute/" + props.instituteId + "/course/" + props.courseId).then((response) => {
            // console.log("Response for dummy is "  + response.data);

            const dataT = response.data;
            setTopicData(dataT['subjects'][props.subKey]['topics']);
            // console.log(topicData + "topic")


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
// api Call End


    // Accodiantion

    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // Accodiantion End


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;


    return (
        <React.Fragment>


            <Accordion
                square
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                className="accoditon_vs accoditon_vs2"
            >
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >
                    <div className="acodition_title">
                        <h5>{props.SubName}</h5>
                        <span
                            className={
                                expanded === "panel1" ? "fa fa-sort-asc" : "fa fa-sort-desc"
                            }
                        ></span>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="conbox_accodition conbox_accodition2">
                    <div className="accodition_content accodition_content2">

                        <div className="down_dow">
                            {

                                topicData.map((userData, index) => (
                                    <>
                                        <button
                                            aria-describedby={id}

                                            onClick={handleClick}
                                            className="down_dow_btn_List"
                                        >

                                            {userData['name']}
                                            <i className="fa fa-sort-desc"></i>
                                        </button>


                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                            }}

                                        >


                                            <div className="box_vs_custoSyllbus">
                                                <p style={{fontSize:15,fontWeight:550,color:"#3334444"}}>Description</p>
                                                <p>{userData['description']}</p>
                                                <div className="btn_box_self btn_box ">
                                                    {/*<button>Untilted.jpg</button>*/}
                                                    {/*<button>Ui_new.mp4</button>*/}
                                                </div>
                                            </div>
                                        </Popover>
                                    </>

                                ))
                            }


                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>


        </React.Fragment>
    );
};

export default SyllabusBatList;
