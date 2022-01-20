
import React from "react";
import {NavLink} from "react-router-dom";



const Side_Menu = ()=> {

  
  return (
    <>
     <div className="navigation_manu">
            <div className="nav_link_box">
                <div className="logo_box">
                    <img src="assets/image/SVG/Group.png" alt="logo no found!" />

                </div>
                <ul className="nav_ul_box">
                    <li ><NavLink to="/home" activeClassName="active"><i className="fa fa-th-large"></i></NavLink></li>
                    <li><NavLink to="/students" activeClassName="active"><i className="fa fa-users"></i></NavLink></li>
                    <li><NavLink to="/teachers" activeClassName="active"><i className="fa fa-user-circle"></i></NavLink></li>
                    <li><NavLink to="/courses" activeClassName="active"><i className="fa fa-graduation-cap"></i></NavLink></li>
                    <li><NavLink to="/AllBatches" activeClassName="active"><i className="fa fa-stack-exchange"></i></NavLink></li>
                    <li><NavLink to="/Batches" activeClassName="active"><i className="fa fa-comments"></i></NavLink></li>
                    <li><NavLink to="/Notificationli" activeClassName="active"><i className="fa fa-square"></i></NavLink></li>
                    {/* <li><NavLink to="/" activeClassName="active"><i className="fa fa-money"></i></NavLink></li> */}
                    <li><NavLink to="/" activeClassName="active"><i className="fa fa-file"></i></NavLink></li>
                    
                </ul>
            </div>

        </div>
    </>
  )
}


export default Side_Menu
