import React, { useState, useContext, useEffect } from "react";
import { useHistory,useParams,Link } from "react-router-dom";
import RegisterContext from "../../context/userContext";
import Axios from "axios";
import UserContext from "../../context/userContext";

const ActivateAccount = () =>{
    const {userData,setUserData} = useContext(UserContext);
    const { userId,secretCode } = useParams();
    const [success,setSuccess] = useState(false);
    const [message,setMessage] = useState();

    const history = useHistory();
    console.log("userId:",userId);
    console.log("secretCode:",secretCode);
    console.log(userData);
    const token = userData.token;
    console.log(token);
    useEffect(()=>{
        if(userData.status === 'active'){
            history.push("/");
          }
          else if(userData.status === 'pending'){
            history.push("/verifymail");
        }
    })
    Axios.get(`/api/auth/verification/verify-account/${userId}/${secretCode}`)
        .then((res)=>{
            console.log(res);
            setSuccess(res.data.success);
            setMessage(res.data.msg);
        })
        .catch(err=>{
            console.log(err);
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
            <h1>Activate Account</h1>
        { success ? (
            <div>
                <h1>{message}</h1>
                <Link to="/login">Login</Link>
            </div>
        ):(
            <div>
                <h1>{message}</h1>
                <button>Resend Mail</button>
            </div>
        )}
        </div>
    )
    
    // const [status,setStatus] = useContext(RegisterContext);
    
    

    // const handleResend = () =>{
    //   console.log("clicked");  
    // }
    // return(
    //     <div>
    //         {status && <h1>An activation Mail has been sent to your mail.Please Check!</h1>}
    //         <button onClick={()=>handleResend}>Resend Mail</button>
    //     </div>
    // )
}

export default ActivateAccount;