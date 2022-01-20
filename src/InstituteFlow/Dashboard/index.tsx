import React, {useEffect, useState} from "react";
import "../../assets/css/style.scss";
import Header from "../../components/Header";
import Side_Menu from "../../components/Side_Menu";
import All_Manage from "./All_Manage";
import Schedule_De from "./Schedule_De";
import StatisticsDe from "./StatisticsDe";
import LecturesSubc from "./LecturesSubc";
import Grid from '@mui/material/Grid';
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {

        const [overView, setOverView] = useState(1);
        const signInDetails = useInjection<SignInDetails>("signInDetails");
        const [OverviewData, setOverviewData] = React.useState({});

        const client = useInjection<AxiosInstance>("client");

        const loader = async () => {
            const response = await client.get('/institute/' + signInDetails.id + '/overview')
            //console.log(response.data)
            setOverviewData(response.data)
        }

    const navigate=useNavigate()
        useEffect(() => {
            navigate("/home")
            loader();
        }, []);


        return (
            <React.Fragment>
                <div className="content_full_container box_ladto">
                    <Side_Menu/>
                    <div
                        className={
                            overView === 2 ? "content_box content_box22" : "content_box"
                        }
                    >
                        <Header title="Home"/>
                        <div className="conte_box_deboard">
                            <div className="conte_box_deboard_inner">
                                <div className="btn_box">
                                    <button
                                        className={
                                            overView === 1 ? "btn_vs_over box_flex_" : "btn_vs_over"
                                        }
                                        onClick={() => setOverView(1)}
                                    >
                                        overview
                                    </button>

                                    <button
                                        className={
                                            overView === 2 ? "box_flex_btn box_flex_" : "box_flex_btn"
                                        }
                                        onClick={() => setOverView(2)}
                                    >
                                        lectures
                                        <span> 30</span>
                                    </button>
                                </div>

                                <div
                                    className={
                                        overView === 1
                                            ? "box_vc_nav_le_2 active_box"
                                            : "box_vc_nav_le_2"
                                    }
                                >
                                    <div className="all_desbo_conte margin_vs">
                                        <div className="teit_all">
                                            <h4>All</h4>
                                            <span>Monday, 28 2021</span>
                                        </div>

                                        <div className="box_cord_gird">
                                            <All_Manage
                                                c_name={"Courses"}
                                                c_value={40}
                                                c_icon={"fa fa-graduation-cap"}
                                                c_redir={"/courses"}
                                            />

                                            <All_Manage
                                                c_name={"Teachers"}
                                                c_value={OverviewData["numberOfTeachers"]}
                                                c_icon={"fa fa-user-circle"}
                                                c_redir={"/teachers"}
                                            />
                                            <All_Manage
                                                c_name={"Students"}
                                                c_value={OverviewData["numberOfStudents"]}
                                                c_icon={"fa fa-users"}
                                                c_redir={"/students"}
                                            />
                                        </div>
                                    </div>

                                    <div className="box_contec_3 margin_vs">
                                        <div className="teit_all">
                                            <h4>Today’s Schedule</h4>
                                        </div>
                                        <div className="box_vdtd">
                                            <Grid container spacing={2}>
                                                <Grid item xs={11}>
                                                    <div className="box_vdtd">
                                                        <Grid container spacing={3}>
                                                            <Schedule_De
                                                                s_value={16}
                                                                s_name={"Live Clasess"}
                                                                s_show={true}
                                                                s_active={false}
                                                            />

                                                            <Schedule_De
                                                                s_value={60}
                                                                s_name={"Clasess Schedule"}
                                                                s_show={false}
                                                                s_active={false}
                                                            />

                                                            <Schedule_De
                                                                s_value={40}
                                                                s_name={"Upcoming Clasess"}
                                                                s_show={false}
                                                                s_active={false}
                                                            />

                                                            <Schedule_De
                                                                s_value={20}
                                                                s_name={"Completed Live Clasess"}
                                                                s_show={false}
                                                                s_active={true}
                                                            />
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>

                                    <div className="box_contec_3 margin_vs">
                                        <div className="box_vdtd">
                                            <Grid container>
                                                <Grid item xs={9}>
                                                    <div className="teit_all teit_all_flex">
                                                        <h4>Statistics</h4>

                                                        <div className="btn_box_moth">
                                                            <a href="#" className="active">
                                                                today
                                                            </a>
                                                            <a href="#">this Week</a>
                                                            <a href="#">this month</a>
                                                        </div>
                                                    </div>
                                                    <div className="box_vdtd_trac_box">
                                                        <StatisticsDe
                                                            staValue={50}
                                                            staName={"Live Clasess Taken"}
                                                            staColor={true}
                                                            staBorder={true}
                                                            staGra={+9.5}
                                                        />
                                                        <StatisticsDe
                                                            staValue={120}
                                                            staName={"Teachers Hours"}
                                                            staColor={false}
                                                            staBorder={true}
                                                            staGra={+0.9}
                                                        />
                                                        <StatisticsDe
                                                            staValue={20}
                                                            staName={"Learning Hours"}
                                                            staColor={false}
                                                            staBorder={true}
                                                            staGra={+0.49}
                                                        />
                                                        <StatisticsDe
                                                            staValue={233}
                                                            staName={"Avg Attendance"}
                                                            staColor={true}
                                                            staBorder={false}
                                                            staGra={-1.4}
                                                        />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={
                                        overView === 2 ? "vs_rs_tbox active_box" : "vs_rs_tbox"
                                    }
                                >
                                    <LecturesSubc/>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
;

export default Dashboard;
