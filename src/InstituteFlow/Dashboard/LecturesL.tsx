import React from "react";
import ListsLectures from "./ListsLectures";

export const convertEpochToDate = (epoch) => {
    return new Date(epoch).toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'})
}

export const convertEpochToTime = (epoch) => {
    return new Date(epoch).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })
}
const LecturesL = (props) => {

    return (
        <React.Fragment>
            {props.lecturesData.map((userData, index) => (
                <ListsLectures
                    batchId={userData['batchId']}
                    key={userData["id"]}
                    courseId={userData['courseId']}
                    liTitle={userData['topicName']}
                    liDate={convertEpochToDate(userData['startTime'])}
                    liStartTime={convertEpochToTime(userData['startTime'])}
                    liEndTime={convertEpochToTime(userData['endTime'])}
                    liNotsColor={"#fff"}
                    liAcCode={userData['batchName']}
                    liZoomL={userData['hostUrl']}
                    courseName={userData['courseName']}
                />
            ))}

        </React.Fragment>
    );
};

export default LecturesL;