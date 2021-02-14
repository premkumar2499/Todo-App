import React, { useState, useContext, useEffect,createContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import EmailContext from '../../context/userContext';
import Axios from "axios";
import Loading from "../Loading/Loading";



const ForgetPassword = () =>{
    const { userData,setUserData, loading, setLoading,email,setEmail } = useContext(UserContext);

    const [error, setError] = useState();
    
    const history = useHistory();
    
    if(userData.status ==='active'){
        history.push('/')
    }
    const submit = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
        const passwordRes = await Axios.post("http://localhost:5000/api/auth/password-reset/get-code", {
          email
        });
        if(!passwordRes.data.success){
            const err = passwordRes.data.errors.map((e,index)=>{
                return(
                    <div class="alert alert-danger alert-dismissible fade show" role="alert" key={index}>
                        <small>{e.msg}</small>
                    </div>
                )
            })
            setError(err);
            
        }
        else{
            history.push("/reset-password");
        }
        setLoading(false);
        
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    };
    

    return(
            <div className="d-flex justify-content-center align-items-center vh-100">
                    { loading ? (
                        <Loading/>
                    ) : (
                        <>
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    
                                    <div className="modal-header">
                                        <p className="fs-3">Get Password Reset Code</p>
                                    </div>
                                    <div className="modal-body">
                                        {error}
                                        <form onSubmit={submit}>
                                            <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter E-mail"
                                            onChange={(e) => setEmail(e.target.value)}
                                            />

                                            <input type="submit" className="btn btn-success mt-4" value="Send Code" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                        )
                    }
                </div>
    )
}

export default ForgetPassword;