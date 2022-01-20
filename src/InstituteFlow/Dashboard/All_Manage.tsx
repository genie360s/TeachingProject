import React from "react";
import "../../assets/css/style.scss";
import {Link} from "react-router-dom";


const All_Manage = (props) => {


    return (
        <React.Fragment>

            <div style={{marginRight: 50}}>
                <Link to={props.c_redir} className="pLink" style={{padding:0}}>
                    <div className="bo_caoe_card" style={{marginRight: 0}}>
                        <i className={props.c_icon}></i>
                        <h4>
                            {" "}
                            {props.c_name}: <span>{props.c_value}</span>
                        </h4>
                    </div>
                </Link>
            </div>

        </React.Fragment>
    );
};

export default All_Manage;
