import React, { useEffect, useContext } from "react";
import { useHistory,useParams } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/userContext";
const VerifyMail = () =>{
    const {userData,setUserData,loading,setLoading} = useContext(UserContext);
    const history = useHistory();

    const token = userData.token;
    useEffect(()=>{
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
        <div>
        { loading ? (
            <h2>loading...</h2>
        ) : (
            <div>
                <h1>An activation Mail has been sent to your mail.Please Check!</h1>
                <button onClick={handleResend}>Resend Mail</button>
            </div>
        )}
        </div>
    )
    
}

export default VerifyMail;