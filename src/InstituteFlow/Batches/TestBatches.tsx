import React, {useEffect, useState} from "react";
import TestAccordion from "./TestAccordion";
import ViewTest from "./ViewTest";
import {useInjection} from "inversify-react";
import {AxiosInstance} from "axios";
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {convertEpochToDate, convertEpochToTime} from "../Dashboard/LecturesL";
import {RefreshBatchStudentsAndTeachers, RefreshTests} from "../../observables/RefreshEvents";

const CreateTest = (props) => {
    const client = useInjection<AxiosInstance>("client")
    const instituteId = useInjection<SignInDetails>("signInDetails").id
    const [viewTest, setViewTest] = useState(0)
    const [allTest, setAllTest] = useState([])

    const getAllTest = async () => {
        client.get(`/institute/${instituteId}/batch/${props.batchId}/test`).then((response) => {
            console.log(response.data)
            setAllTest(response.data)
        }).catch(e => console.log(e))
    }
    const PastTests = () => {

    };

    useEffect(() => {
        getAllTest()
        setViewTest(0)
        const subscription = RefreshTests.subscribe(() => {
            getAllTest()
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [])
    const [lectureView, setLectureView] = useState(1);
    const [selectedTest,setSelectedTest]=useState({testAttachmentDetails:[{attachments:[]}]})

    return (
        <React.Fragment>
            <div className={(viewTest === 0) ? "v_callBatches" : "d_nones"}>

                <div className="bbox_ted_f">
                    <button className={lectureView === 1 ? "active_v" : ""} onClick={() => setLectureView(1)}>Past
                        Tests
                    </button>
                    <button className={lectureView === 2 ? "active_v" : ""} onClick={() => setLectureView(2)}>Live
                        Tests
                    </button>
                    <button className={lectureView === 3 ? "active_v" : ""} onClick={() => setLectureView(3)}>Upcomming
                        Tests
                    </button>
                </div>

                <div>

                    <div className={lectureView === 1 ? "d_blocks" : "d_nones"}>
                        {
                            allTest.filter(function (lecture) {
                                return lecture['endTime'] < Date.now()
                            }).map((itr) => (
                                <TestAccordion
                                    data={itr}
                                    panle={"leture3"}
                                    titleName={itr['name']}
                                    description={itr['description']}
                                    date={convertEpochToDate(itr['endTime'])}
                                    time={convertEpochToTime(itr['endTime'])}
                                    setViewTest={setViewTest}
                                    setSelectedTest={setSelectedTest}
                                />
                            ))
                        }
                    </div>

                    <div className={lectureView === 2 ? "d_blocks" : "d_nones"}>
                        {
                            allTest.filter(function (lecture) {
                                return lecture['startTime'] < Date.now() && lecture['endTime'] > Date.now()
                            }).map((itr) => (
                                <TestAccordion
                                    data={itr}
                                    panle={"leture3"}
                                    titleName={itr['name']}
                                    description={itr['description']}
                                    date={convertEpochToDate(itr['endTime'])}
                                    time={convertEpochToTime(itr['endTime'])}
                                    setViewTest={setViewTest}
                                    setSelectedTest={setSelectedTest}
                                />
                            ))
                        }
                    </div>

                    <div className={lectureView === 3 ? "d_blocks" : "d_nones"}>
                        {
                            allTest.filter(function (lecture) {
                                return lecture['startTime'] > Date.now()
                            }).map((itr) => (
                                <TestAccordion
                                    data={itr}
                                    panle={"leture3"}
                                    titleName={itr['name']}
                                    description={itr['description']}
                                    date={convertEpochToDate(itr['endTime'])}
                                    time={convertEpochToTime(itr['endTime'])}
                                    setViewTest={setViewTest}
                                    setSelectedTest={setSelectedTest}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={(viewTest === 1) ? "" : "d_nones"}>
                <ViewTest setViewTest={setViewTest} data={selectedTest}/>
            </div>
        </React.Fragment>
    );
};

export default CreateTest;
