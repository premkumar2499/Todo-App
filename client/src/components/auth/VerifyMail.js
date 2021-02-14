import React, { useEffect, useContext } from "react";
import { useHistory,useParams } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/userContext";
import Loading from "../Loading/Loading";
const VerifyMail = () =>{
    const {userData,setUserData,loading,setLoading} = useContext(UserContext);
    const history = useHistory();

    const token = userData.token;
    useEffect(()=>{
        if(!userData.token){
            history.push('/register');
        }
        if(userData.status === 'pending'){
            Axios.get("/api/auth/verification/get-activation-email", { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res)=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        }
        else if(userData.status === 'active'){
            history.push('/');
        }
        console.log(userData);
    })
    
    const handleResend = () =>{
        Axios.get("/api/auth/verification/get-activation-email", { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
      console.log("clicked");  
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
        { loading ? (
            <Loading/>
        ) : (
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <p className="fs-3">An activation Mail has been sent to your mail.Please Check!</p>
                        <button className="btn btn-success" onClick={handleResend}>Resend Mail</button>
                    </div>
                </div>
            </div>
        )}
        </div>
    )
    
}

export default VerifyMail;