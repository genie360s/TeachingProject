import React, {useState, useEffect} from "react";
import HeadSub from "../../components/HeadSub";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import HourglassFullSharpIcon from "@mui/icons-material/HourglassFullSharp";

import Side_Menu from "../../components/Side_Menu";
import AccordCustom from "../Batches/AccordCustom";
import AddStudent from "./AddStudent";
import {RefreshBatchStudentsAndTeachers, RefreshStudentsAndTeachers} from "../../observables/RefreshEvents";

import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";

const Students = () => {

    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [studentData, setStudentData] = React.useState([]);
    const client = useInjection<AxiosInstance>("client");
    const signInDetails = useInjection<SignInDetails>("signInDetails");
    const handleClose = () => {
        setAddDialogOpen(false);
    };

    const studentDetails = {
        contactNumber: "",
        dateOfBirth: 0,
        email: "",
        id: "",
        maxEducation: "BELOW_MATRICULATE",
        name: ""
    };

    function loadStudents() {
        client
            .get("/institute/" + signInDetails.id + "/students")
            .then((response) => {
                const dataT = response.data;
                setStudentData(dataT);
            })
            .catch(function (error) {
                //console.log("ERROR is : " + error);
            });
    }

    useEffect(() => {
        loadStudents();
        const subscription = RefreshStudentsAndTeachers.subscribe(() => {
            loadStudents()
        })
        return () => {
            subscription.unsubscribe()
        }
    }, []);

    return (
        <React.Fragment>
            <div className="content_full_container box_ladto">
                <Side_Menu/>
                <div className="content_box content_box22">
                    <header className="heder_nav  ">
                        <div className="box_vc_nav_right">
                            <h4>Student</h4>
                        </div>
                        <div className="box_vc_nav_left">
                            <button
                                className="btnx_hede"
                                onClick={() => setAddDialogOpen(true)}
                            >
                                <CreateNewFolderIcon/>
                                <span>Invite Student</span>
                            </button>
                            <div className="ball_icon_box">
                                {/* <i className="fa fa-bell"></i> */}
                                <HourglassFullSharpIcon/>
                            </div>
                            <HeadSub/>
                        </div>
                    </header>

                    <div className="conte_box_deboard ">
                        <div className="conte_box_deboard_inner">
                            {/* root box start*/}

                            {studentData.map((userData, index) => (
                                <AccordCustom
                                    key={userData["id"]}
                                    isx={userData["id"]}
                                    uName={userData["name"]}
                                    uPhone={userData["contactNumber"]}
                                    uEmail={userData["email"]}
                                    uKey={"user" + userData["id"]}
                                    addbtnbtn={true}
                                    addCode={true}
                                    liNotsColor={"#B1F1CC"}
                                    liAcCode={"48483"}
                                    verify={"student"}
                                />
                            ))}

                            {/* root box end*/}
                        </div>
                    </div>
                </div>
            </div>
            <AddStudent open_log={addDialogOpen} closevc={handleClose} data={studentDetails} entity={'Student'}
                        instituteId={signInDetails.id}/>
        </React.Fragment>
    );
};

export default Students;
