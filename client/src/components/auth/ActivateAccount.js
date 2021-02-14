import React, { useState, useContext, useEffect } from "react";
import { useHistory,useParams,Link } from "react-router-dom";
import RegisterContext from "../../context/userContext";
import Axios from "axios";
import UserContext from "../../context/userContext";
import Loading from '../Loading/Loading'

const ActivateAccount = () =>{
    const {userData,setUserData,loading,setLoading} = useContext(UserContext);
    const { userId,secretCode } = useParams();
    const [success,setSuccess] = useState(false);
    const [message,setMessage] = useState();

    const history = useHistory();
    // console.log("userId:",userId);
    // console.log("secretCode:",secretCode);
    console.log(userData);
    const token = userData.token;
    // console.log(token);
    useEffect(()=>{
        setLoading(true);
        Axios.get(`/api/auth/verification/verify-account/${userId}/${secretCode}`)
        .then((res)=>{
            setSuccess(res.data.success);
            setMessage(res.data.msg);
            if(success){
                localStorage.removeItem("auth-token");
            }
        })
        .catch(err=>{
            console.log(err);
        })
        setLoading(false);
    })
    if(userData.status === 'active'){
        history.push("/");
    }
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
            { loading? (
                <Loading/>
            ) : (    
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                        { success ? (
                            <>
                                <h1>{message}</h1>
                                <Link className="btn btn-primary" to="/login">Login</Link>
                            </>
                        ):(
                            <>
                                <h1>{message}</h1>
                                <button className="btn btn-success" onClick={handleResend}>Resend Mail</button>
                            </>
                        )}                        
                        </div>
                    </div>
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