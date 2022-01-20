import React, {useEffect, useState} from "react";


import AccordCustom from "./AccordCustom";
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {RefreshBatchStudentsAndTeachers, RefreshStudentsAndTeachers} from "../../observables/RefreshEvents";

const StudentsTeachers = (props) => {
    const [StudentData, setStudentData] = useState([]);
    const [TeacherData, setTeacherData] = useState([]);

    const client = useInjection<AxiosInstance>("client")
    const instituteId = useInjection<SignInDetails>("signInDetails").id


    //const instituteId=.instituteId
    //console.log(`this is the id ${instituteId}`)


    const Teachers = () => {
        client.get(`/institute/${instituteId}/batch/${props.batchId}/teachers`).then(response => setTeacherData(response.data)).catch(e => console.log(e))
        //setTeacherData((await client.get(`/institute/${props.instituteId}/teachers`)).data)
        //console.log(TeacherData)
    }
    const Students = () => {
        client.get(`/institute/${instituteId}/batch/${props.batchId}/students`).then(response => setStudentData(response.data)).catch(e => console.log(e))
        //setStudentData((await client.get(`/institute/${props.instituteId}/students`)).data)
        //console.log(StudentData)
    }
    useEffect(() => {

        Teachers();
        Students();
        const subscription = RefreshBatchStudentsAndTeachers.subscribe(() => {
            Teachers();
            Students();
        })
        return () => {
            subscription.unsubscribe()
        }
    }, []);

    return (
        <React.Fragment>
            <div className="v_callBatches mt-4">
                <div className="box_student_te_cont">


                    <div className="title_all_box">
                        <h4>List of students</h4>
                    </div>


                    <div className="studyMari_d">
                        {StudentData.map((userData, i) => (
                            <AccordCustom
                                key={userData["id"]}
                                isx={userData["id"]}
                                uName={userData["name"]}
                                uPhone={userData["contactNumber"]}
                                uEmail={userData["email"]}
                                uKey={"user" + userData["id"]}
                                addbtnbtn={true}
                                batchId={props.batchId}
                                //addCode={true}
                                //liNotsColor={"#B1F1CC"}
                                //liAcCode={"48483"}
                                verify={"student"}
                            />
                        ))}

                    </div>

                    <div className="title_all_box">
                        <h4>List of Teacher</h4>
                    </div>


                    <div className="studyMari_d">
                        {TeacherData.map((userData, i) => (
                            <AccordCustom
                                key={userData["id"]}
                                isx={userData["id"]}
                                uName={userData["name"]}
                                uPhone={userData["contactNumber"]}
                                uEmail={userData["email"]}
                                uKey={"user" + userData["id"]}
                                addbtnbtn={true}
                                batchId={props.batchId}
                                //addCode={true}
                                //liNotsColor={"#B1F1CC"}
                                //liAcCode={"48483"}
                                verify={"teacher"}
                            />
                        ))}
                    </div>


                </div>
            </div>
        </React.Fragment>
    );
};

export default StudentsTeachers;