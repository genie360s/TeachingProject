import React, {useEffect} from "react";
// Accodina
import {withStyles} from "@mui/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


// component
import DeleteModulsC from "../StudentsDes/DeleteModulsC";

// icon

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
        padding: "0px 20px",

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
        padding: "20px",
    },
}))(MuiAccordionDetails);


const AccordCustom = (props) => {

    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // Accodiantion End
    const [checked, setChecked] = React.useState(false);

    useEffect(()=>{
        setChecked(false)
    },[])

    const handleChange2 = (event) => {
        setChecked(event.target.checked);
        props.isSelected(checked)
        //console.log(checked);
    };


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleCloses = () => setOpen(false);


    return (
        <React.Fragment>
            <Accordion
                square
                expanded={expanded === props.uKey}
                onChange={props.addbtnShow === true ? handleChange(props.uKey) : handleChange(props.uKey)}
            >
                <AccordionSummary
                    className="accord_Summarey"
                    expandIcon={
                        <ArrowDropDownIcon style={{color: "#fff", fontSize: "30px"}}/>
                    }
                    aria-controls={props.uKey}
                    id={props.uKey}
                >
                    <div className=" study_inner2">
                        <div className="imgbox_vs">
                            <img alt="Remy Sharp" src="assets/image/p1.jpg"/>
                        </div>
                        <div>
                            <Typography variant="subtitle2" className="name_tie" display="block"
                                        gutterBottom>{props.uName}</Typography>

                            <Typography variant="caption" className="name_subs" display="block">
                                {props.uEmails}
                            </Typography>
                            <Typography variant="caption" className="name_subs" display="block">
                                {props.uPhones}
                            </Typography>
                        </div>


                    </div>

                    <div
                        className={props.addbtnShow === true && !props.addbtnbtn === true ? "d_blocks vsbd" : "d_nones"}>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange2}
                            inputProps={{"aria-label": "controlled"}}
                            className={checked === true ? "chebox_custom2" : "chebox_custom"}
                        />
                    </div>

                    <div className={props.addbtnbtn === true ? "d_blocks vsbd" : "d_nones"}>
                        <button className="boxdv" onClick={handleOpen}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>


                </AccordionSummary>
                <div className={props.addbtnShow === true ? "d_blocks" : "d_blocks"}>
                    <AccordionDetails>

                        <Typography variant="subtitle2" className="name_tie marvd" component="div">
                            <i className="fa fa-phone" style={{marginRight: "10px"}}></i>
                            {props.uPhone}
                        </Typography>
                        <Typography variant="subtitle2" className="name_tie" component="div" gutterBottom>
                            <i className="fa fa-envelope" style={{marginRight: "10px"}}></i>
                            {props.uEmail}
                        </Typography>


                        <div className={props.addCode === true ? "d_blocks  box_alss_ver2 vsd_show" : "d_nones"}>
         
          <span style={{background: props.liNotsColor}}>
            Ac Code: {props.liAcCode}
              <br/>
            Figma Course
          </span>
                            <span style={{background: props.liNotsColor}}>
            Ac Code: {props.liAcCode}
                                <br/>
            Figma Course
          </span>
                        </div>
                    </AccordionDetails>
                </div>
            </Accordion>
            <DeleteModulsC open_mode={open} closemode={handleCloses} ids={props.isx} verifys={props.verify}
                           batchId={props.batchId} name={props.uName}/>
        </React.Fragment>
    );
};

export default AccordCustom;
