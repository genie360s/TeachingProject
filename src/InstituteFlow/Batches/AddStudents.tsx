import React, {useEffect, useState} from "react";
import AccordCustom from "./AccordCustom";
import Button from '@mui/material/Button';
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {RefreshBatchStudentsAndTeachers} from "../../observables/RefreshEvents";

let listOfStudent: String[] = []

const AddStudents = (props) => {

    const client = useInjection<AxiosInstance>("client");
    const instituteId = useInjection<SignInDetails>("signInDetails").id

    const [Students, setStudents] = useState([]);
    const fetchData = async () => {
        //console.log(instituteId)
        client.get(`/institute/${instituteId}/students`).then((response => {
            //console.log("dekh le1 => : " + JSON.stringify(response.data))
            const data = response.data;
            console.log("isntitute students = > \n" + response.data.map(itr => itr['id']))
            //data=0 1 2 3 4 5
            client.get(`/institute/${instituteId}/batch/${props.batchId}/students`).then((response => {
                //response 1 2 5
                console.log("bbatch students = > \n" + response.data.map(itr => itr['id']))
                //console.log("dekh le2 => : " + JSON.stringify(response.data.map(itr=>itr['id'])))
                const temp = data.filter((itr) => !response.data.map((obj) => obj['id']).includes(itr['id']))
                setStudents(temp)
                //RefreshBatchStudentsAndTeachers.next()
                console.log("not students = > " + temp.map(itr => itr['id']))
            })).catch(e => {
                //console.log("chiii=> ");
                console.log(e)
            })

            //console.log("=>>>1:: " + JSON.stringify(Students))
        })).catch(e => console.log(e))


//      console.log("=>>>>>>>>>>" + JSON.stringify(BatchStudents))

    }

    useEffect(() => {
        //console.log("list => ",listOfStudent)
        fetchData()
        const subscription = RefreshBatchStudentsAndTeachers.subscribe(() => {
            fetchData()
        })
        return () => {
            subscription.unsubscribe()
        }


    }, [])


    const HandleCheck = (e, id) => {
        (!e) ? listOfStudent.push(id) : listOfStudent = ((listOfStudent.length > 0) ? listOfStudent.filter((itr) => itr != id) : [])
        //console.log(listOfStudent)
        //console.log("list => ",listOfStudent)
    }
    const [isClicked, setIsClicked] = useState(false);
    const HandleAddStudents = (e) => {
        //console.log("aa gya h yaha")
        //console.log("list => ",listOfStudent)
        props.setBover(1)
        {
            listOfStudent.map((itr) => {
                client.post(`/institute/${instituteId}/batch/${props.batchId}/student/${itr}`).then((response) => {
                    console.log("ye raha resposnse => : " + JSON.stringify(response.data))
                    RefreshBatchStudentsAndTeachers.next()
                }).catch((e) => {
                    console.log("error=> " + e)
                })
            })
        }
        //props.bover=true;
        //console.log("is clicked")
        //setIsClicked(true);

    }

    return (
        <>
            <React.Fragment>
                {
                    Students.map((itr, i) => (
                        <AccordCustom
                            uName={itr['name']}
                            //uKey={itr['id']}
                            uPhone={itr["contactNumber"]}
                            uEmail={itr["email"]}
                            value={itr['id']}
                            addbtnShow={true}
                            isSelected={(e) => HandleCheck(e, itr['id'])}
                        />
                    ))
                }


            </React.Fragment>


            <div className="box_st_positio">

                <Button variant="contained" style={{
                    background: "#fff",
                    padding: "8px 80px",
                    borderRadius: "15px",
                    textTransform: "capitalize",
                    color: "#333"
                }} onClick={HandleAddStudents}>Add</Button>
            </div>
        </>
    );
};

export default AddStudents;
