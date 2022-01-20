import React, { useState } from "react";
import HeadSub from "../../components/HeadSub";

// icon
import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupUser from '@mui/icons-material/Group';
import HourglassFullSharpIcon from '@mui/icons-material/HourglassFullSharp';

import {Link} from "react-router-dom";

// import Header from "../../components/Header";
import Grid from "@mui/material/Grid";
import Side_Menu from "../../components/Side_Menu";
import NotiList from "./NotiList";
import CreateNotification from "./CreateNotification";




 
const Notificationli = () => {

    const [NotifiView, setNotifi] = useState(1);

    
  return (
    <React.Fragment>
      <div className="content_full_container box_ladto">
        <Side_Menu />
        <div className="content_box content_box22">
          <header className="heder_nav  ">
            <div className="box_vc_nav_right box_vc_nav_right22">
              <a href="#">
                <i className="fa fa-long-arrow-left"></i>
              </a>
              <h4>AC code: 4895</h4>
              <span>Figma Course</span>
            </div>
            <div className="box_vc_nav_left">
            <button className="btnx_hede" onClick={()=>setNotifi(2)}>
        <CreateNewFolderIcon/>
        <span>Create notification</span>
      </button>
     
              <HeadSub />
            </div>
          </header>

          <div className="conte_box_deboard ">
            <div className="conte_box_deboard_inner">
              {/* root box start*/}



              <div className={NotifiView === 1 ? "d_blocks" : "d_nones"}>
              <NotiList list={"list1"}/>
<              NotiList list={"list2"}/>
              </div>

              <div className={NotifiView === 2 ? "d_blocks" : "d_nones"}>
                <CreateNotification/>
              </div>
             
              


                
              
              {/* root box end*/}
            </div>
          </div>
        </div>
      </div>
     
    
    </React.Fragment>
    
  );
};

export default Notificationli;
