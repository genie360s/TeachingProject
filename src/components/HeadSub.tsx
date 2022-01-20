import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useInjection} from "inversify-react";
import {SignInDetails} from "../LoginFlow/SignInDetails";
import {AxiosInstance} from "axios";


const HeadSub = () => {
    const signInDetails = useInjection<SignInDetails>("signInDetails");
    const navigate = useNavigate();
    const client = useInjection<AxiosInstance>("client")
    const [data, setData] = useState({})
    const getInfo = () => {
        client.get(`/institute/${signInDetails.id}`).then(response=>{
            setData(response.data)
        })
    }
    async function logOut() {
        //console.log("hua kuch?"+signInDetails.id);
        await signInDetails.SignOut();
        navigate('/login')
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (
        <>
            <div className="ball_icon_box">
                <i className="fa fa-bell"></i>
                <span>0</span>
            </div>
            <div className="profile_box">
                <div className="image_profile_box">
                    <img src="assets/image/p1.jpg"/>
                </div>

                <h4>{data['instituteName']}</h4>

                <div className="profiel_derowpdowN">
                    <Link to="/Profile">
                        {" "}
                        <i className="fa fa-user"></i>Profile
                    </Link>
                    <a onClick={(e) => logOut()} href="#" className="activ_hover">
                        {" "}
                        <i className="fa fa-sign-out"></i>Log out
                    </a>
                </div>
            </div>
        </>
    );
};

export default HeadSub;
