import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ArticleIcon from "@mui/icons-material/Article";

import InputAdornment from "@mui/material/InputAdornment";
import {resolve} from "inversify-react";
import {AxiosInstance} from "axios";
import 'reflect-metadata'
import {SignInDetails} from "../../LoginFlow/SignInDetails";
import {RefreshCourse} from "../../observables/RefreshEvents";

//To generate random id
let generateId = () => {
    return require("crypto").randomBytes(20).toString('hex');
}

class EditCourse extends React.Component<any,any> {
    @resolve("client")
    private readonly client: AxiosInstance;

    @resolve("signInDetails")
    private readonly institute: SignInDetails;
    private courseId;// = 'a06f2dd1b6e2d8dac58dfa4c724cc37678653a84';

    componentDidMount() {
        this.courseId=this.props.courseId
        this.client.get(`/institute/${this.institute.id}/course/` + this.courseId).then((response) => {

            const apidata = response.data;
            apidata.subjects.map((itr => itr.topics.sort(function (a, b) {
                return a.ordering - b.ordering
            })))

            this.setState({id: apidata.id});
            this.setState({name: apidata.name});
            this.setState({description: apidata.description});
            this.setState({subject: apidata.subjects})

            console.log("after adding to state => ",this.state)

        }).catch(function (error) {
            console.log("ERROR is : " + error);
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            addData: false,
            addDataid: "",
            tpiName: "",
            tpiDes: "",
            name: "",
            description: "",
            subject: [
                {
                    id: "",
                    name: "",
                    topics: [],
                    //description: "",
                },
            ],
        };

        this.courseHandal = this.courseHandal.bind(this);
        this.topicHandal = this.topicHandal.bind(this);
        this.subjectHandal = this.subjectHandal.bind(this);


    }


    techerDat = (stateVariable) => {


        const data = {
            id: stateVariable.id,
            instituteId: stateVariable.instituteId,
            name: stateVariable.name,
            description: stateVariable.description,
            subjects: stateVariable.subject
        };
        console.log("Request final =>>> ", data);


        this.client.put(`/institute/${this.institute.id}/course/${this.courseId}`, data).then((response) => {
            console.log("Response for dummy is ",response.data);
            RefreshCourse.next()
            const dataT = response.data;


        }).catch(function (error) {
            console.log("ERROR is : " + error);
        });

    }

    techerSubit = () => {
        this.props.bover(1)
        this.techerDat(this.state);
    }


    //to add region and tier
    addFTClick = () => {
        // this.techerDat(this.state);
        const subject = [...this.state.subject];

        subject.push({
            id: generateId(),
            name: "",
            topics: [],
            description: "",
        });
        this.setState({subject});
        //console.log(this.state);
    };

    Input = styled("input")({
        display: "none",
    });

    //to remove a tier
    removefTClick = (i, idx) => {
        const subject = [...this.state.subject];
        subject[i].topics.splice(idx, 1);
        this.setState({subject});
    };

    //to remove a tier
    removeTClick = (i) => {
        const subject = [...this.state.subject];
        subject.splice(i, 1);
        this.setState({subject});
    };


    // to add a tier
    addTSubmitClick = (event) => {
        event.preventDefault();

        const subject = [...this.state.subject];
        const idd = this.state.addDataid;
        //console.log(subject['topics']);
        let ordering;
        try {
            ordering = subject[idd].topics[subject[idd].topics.length - 1].ordering + 1
        } catch (e) {
            ordering = 0
        }

        subject[idd].topics.push({
            id: generateId(),
            name: this.state.tpiName,
            description: this.state.tpiDes,
            ordering: ordering
        });
        this.setState({subject});
        this.handleClose();
    };


    addTClick = (i) => {
        this.setState({addData: true, addDataid: i});
        //console.log(this.state);
    };

    handleClose = () => {
        this.setState({addData: false});
    };


    courseHandal = (e) => {
        let name = e.target.name;
        let value = e.target.value
        this.setState({
            [name]: value,
        });

        //console.log(this.state);
    };
    topicHandal = (e) => {
        let name = e.target.name;
        let value = e.target.value
        this.setState({
            [name]: value,
        });

        //console.log(this.state);
    };


    // subjectHandal = (e) => {

    //     this.setState((prevState) => ({

    //         subject:[
    //             ...prevState.subject,
    //             {

    //                 [e.target.name]: e.target.value,
    //             },
    //         ]
    //     }));
    // };


    subjectHandal = (e, i) => {
        // let names = e.target.name;
        let value = e.target.value;
        this.state.subject[i].name = value;

        this.setState({subject: this.state.subject});

        //console.log(this.state.subject[i].name);

    };

    // onChangeHandlerParameter = e => {
    //     this.setState((prevState) => {
    //             parameter:[
    //                       ...prevState.parameter,
    //                       {"id": e.target.id,"value": e.target.value}
    //                       ]
    //                  });
    //   }

    proveModul = (idx, i) => {
        var puls = idx + i;
        this.setState({BatchesView: puls});
        //console.log(puls);
    }


    render() {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TextField
                            value={this.state.name}
                            type="text"
                            label="Course Name"
                            variant="filled"
                            className="box_vde"
                            onChange={this.courseHandal}
                            name="name"
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            value={this.state.description}
                            type="text"
                            label="Course Description"
                            variant="filled"
                            className="box_vde"
                            name="description"
                            onChange={this.courseHandal}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {this.state.subject.map((tier, i) => (
                                <Grid item xs={3} key={i}>
                                    <TextField
                                        value={tier.name}
                                        type="text"
                                        label="Subject Name"
                                        variant="filled"
                                        name="name"
                                        onChange={(e) => this.subjectHandal(e, i)}
                                        className="box_vde"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <div className="obx_co">
                                                        <button onClick={this.removeTClick.bind(this, i)}>
                                                            <DeleteIcon
                                                                sx={{color: "#fff", width: "14px"}}
                                                            />
                                                        </button>
                                                        <AddIcon
                                                            sx={{
                                                                color: "#333",
                                                                width: "20px",
                                                                marginLeft: "6px",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={this.addTClick.bind(this, i)}
                                                        />
                                                    </div>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <Grid container spacing={2}>
                                        {tier.topics.map((tieredInput, idx) => (
                                            <Grid item xs={12} key={idx}>
                                                <div className="input_f_box">
                                                    <h4>{this.state.subject[i].topics[idx].name}</h4>

                                                    <div className="obx_co">
                                                        <button>
                                                            <DeleteIcon
                                                                sx={{color: "#fff", width: "14px"}}
                                                                onClick={this.removefTClick.bind(
                                                                    this,
                                                                    i,
                                                                    idx
                                                                )}
                                                            />
                                                        </button>

                                                        {/* <CreateNewFolderIcon*/}
                                                        {/*    sx={{*/}
                                                        {/*        color: "#333",*/}
                                                        {/*        width: "20px",*/}
                                                        {/*        marginLeft: "8px",*/}
                                                        {/*        cursor: "pointer",*/}
                                                        {/*    }}*/}
                                                        {/*/> */}


                                                        <div className="hover_box">
                                                            <ArticleIcon
                                                                sx={{
                                                                    color: "#333",
                                                                    width: "20px",
                                                                    marginLeft: "6px",
                                                                    cursor: "pointer",

                                                                }}


                                                            />
                                                            <div className="dorndow_box">
                                                                <h4>Description </h4>
                                                                <span>{this.state.subject[i].topics[idx].description}</span>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>


                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            ))}

                            <Grid item xs={2}>
                                <div className="btnx_hede2dc">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        className="btnx_hede "
                                        onClick={this.addFTClick.bind(this)}
                                    >
                                        <AddIcon sx={{marginRight: "10px"}}/> Add Subject
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} className="mavde">
                            <Grid item xs={4}>
                                <button className="btn_custond" onClick={this.techerSubit}>Update</button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <div className="dilog">
                    <Dialog
                        open={this.state.addData}
                        onClose={this.handleClose.bind(this)}
                        className="vsxd"
                    >
                        <div className="box_form_custom">
                            <Typography
                                variant="h6"
                                component="h2"
                                align="center"
                                gutterBottom
                            >
                                Create Topic
                            </Typography>
                            <form onSubmit={this.addTSubmitClick}>
                                <div className="input_fleil_box mt-3">
                                    <TextField

                                        type="text"
                                        label="Topic Name"
                                        variant="filled"
                                        className="box_vde"
                                        onChange={this.topicHandal}
                                        name="tpiName"
                                    />
                                    <TextField
                                        type="text"
                                        label="Topic Discription"
                                        variant="filled"
                                        className="box_vde"
                                        onChange={this.topicHandal}
                                        name="tpiDes"
                                        //focused
                                    />

                                    <div className="btn_box mt-2">
                                        <button
                                            type="submit"
                                            className="btn_vs_over  btn_vs_over_2v"

                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Dialog>
                </div>
            </>
        );
    }
}

export default EditCourse;
