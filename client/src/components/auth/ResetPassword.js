import React, { useState, useContext, useEffect,useCallback } from "react";
import { useHistory,Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import Loading from '../Loading/Loading'

import Axios from "axios";


const ResetPassword = () =>{
    const { userData,setUserData, loading, setLoading,email,setEmail } = useContext(UserContext);
    // const {email,setEmail } = useContext(EmailContext);
    console.log(email);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [code, setCode] = useState();
    const [error, setError] = useState();
    const [isSending,setIsSending] = useState(false);
    
    const history = useHistory();

    if(userData.status ==='active'){
        history.push('/')
    }
    if(!email){
        history.push('/forget-password');
    }
    
    const submit = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);

        const passwordRes = await Axios.post("http://localhost:5000/api/auth/password-reset/verify", {
          email, password, confirmPassword, code
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
            history.push("/login");
        }
        setLoading(false);
        
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    };
    const ResendRequest = useCallback(async () => {
        // don't send again while we are sending
        if (isSending) return
        // update state
        setIsSending(true)
        // send the actual request
        await Axios.post("http://localhost:5000/api/auth/password-reset/get-code", {
          email
        });
        // once the request is sent, update state again
        setIsSending(false)
      }, [isSending]) // update the callback if the state changes
    

    return(
      <div className="d-flex justify-content-center align-items-center vh-100">
          {loading?(
            <Loading/>
          ):(
            <>
                <div className="modal-dialog modal-dialog-centered custom-box" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div className="container">
                              <div className="row">
                                <div className="col font-weight-bold fs-2">
                                  <p className="fs-5">Reset Your Password</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={submit}>
                              <div className="form-group mb-1" id="formGroup">
                                      <input
                                        id="email"
                                        type="email"
                                        className="form-control disabled" 
                                        aria-describedby="emailHelp"
                                        placeholder="E-mail"
                                        defaultValue={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                      />
                              </div>
                              <div className="form-group mb-1" id="formGroup">
                                  <input
                                      id="password"
                                      type="password"
                                      className="form-control"
                                      placeholder="Password"
                                      onChange={(e) => setPassword(e.target.value)}
                                  />
                              </div>
                              <div className="form-group mb-1" id="formGroup">
                                <input
                                  type="password"
                                  placeholder="Confirm Password"
                                  className="form-control" 
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  />
                                </div>
                                <div className="form-group mb-1" id="formGroup">
                                  <input
                                    id="code"
                                    type="text"
                                    placeholder="Enter Code"
                                    className="form-control" 
                                    onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>      
                              <div className="container">
                                <div className="row pt-2">
                                  <input type="submit" className="p-1 btn btn-primary" value="Submit"/>
                                </div>
                              </div>
                              <button className="btn btn-success form-control mt-2" onClick={ResendRequest}>Resend Code</button>
                            </form>
                          </div>
                    </div>
                </div>
                {/* <h2>Register</h2>
                {error}
                <form className="form" onSubmit={submit}>
                    
                    <input
                    id="first-name"
                    placeholder="First Name"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    />

                    
                    <input
                    id="last-name"
                    placeholder="Last Name"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    />

                    
                    <input
                    id="email"
                    placeholder="E-mail"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                    id="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <input type="submit" value="Register" />
                    <p>Have an Account?</p><Link to="/login">Log in</Link>
                </form> */}
              </>            
          )}
          </div>
    )
}

export default ResetPassword;