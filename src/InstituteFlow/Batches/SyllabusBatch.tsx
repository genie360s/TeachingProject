import React, {useEffect} from "react";
import SyllabusList from "./SyllabusBatList";
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {RefreshCourse, RefreshStudentsAndTeachers} from "../../observables/RefreshEvents";


const SyllabusBatch = (props) => {

    //console.log("course dekh le bhai = "+props.courseId)

    const [sylabusData, setSylabusData] = React.useState({subjects: [{topics: []}]});

    const [subjectsData, setSubjectsData] = React.useState([{topics: []}]);


    const client = useInjection<AxiosInstance>("client");

    const instituteId = useInjection<SignInDetails>("signInDetails").id
    //console.log("deined=>"+props.courseId)
    let data = {
        id: "",
        name: '',
        description: "",
        subjects: [
            {
                id: "",
                name: 0,
                topics: [
                    {
                        id: "",
                        ordering: 0,
                        description: ""
                    }
                ]
            }
        ]
    }
    const techerDat = () => {
        client.get("/institute/" + instituteId + "/course/" + props.courseId).then((response) => {
            //console.log("Response for dummy is " + response.data);

            const dataT = response.data;

            data.id = dataT.id
            data.name = dataT.name
            data.name = dataT.description
            data.subjects = dataT.subjects
            //console.log("sara data => " + JSON.stringify(data));
            //console.log("sara data => " + JSON.stringify(dataT));
            setSubjectsData(dataT.subjects);

            //console.log(JSON.stringify(data.subjects, null, 4))
            setSylabusData(dataT);


            //console.log(JSON.stringify(dataT,null,4));


        }).catch(function (error) {
            //console.log("ERROR is : " + error);
        });
    }

    useEffect(() => {
        techerDat();
        const subscription = RefreshCourse.subscribe(() => {
            techerDat()
        })
        return () => {
            subscription.unsubscribe()
        }
    }, []);

    // console.log( JSON.stringify(sylabusData) +"Sylabus");


    return (
        <React.Fragment>
            <div className="v_callBatches mt-4">
                <div className="sylabs_text_cont" style={{textAlign:'center'}}>
                    <h4> {sylabusData['name']}</h4>
                    <p>{sylabusData['description']}
                    </p>
                </div>
                {


                    subjectsData.sort(function (a, b) {
                        return a['ordering'] - b['ordering']
                    }).map((userData, index) => (
                        <SyllabusList
                            key={index}
                            subKey={index}
                            SubName={userData['name']}
                            SubId={userData['id']}
                            courseId={props.courseId}
                            instituteId={props.instituteId}
                        />

                    ))
                }

            </div>

        </React.Fragment>
    );
};

export default SyllabusBatch;
