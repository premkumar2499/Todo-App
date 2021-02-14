import React, { useState, useContext, useEffect,useCallback } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";

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
                    <p key={index}>{e.msg}</p>
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
      <div className="page">
            { loading ? (
                 <h1>Loading...</h1>
             ) : (
                <>
                    {error}
                    {email && <h1>A secret code sent to your Email ID.Please Check!</h1>}
                    <h2>Forget Password</h2>
                    <form className="form" onSubmit={submit}>
                        <input
                        id="email"
                        placeholder="E-mail"
                        type="email"
                        defaultValue={email}
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
                        <input
                        id="code"
                        placeholder="Enter Code"
                        type="text"
                        onChange={(e) => setCode(e.target.value)}
                        />

                        <input type="submit" value="Submit" />
                    </form>
                    <button onClick={ResendRequest}>Resend Code</button>
                    {/* <input type="button" onClick={ResendRequest}>Resend Code</input> */}
                </>
                )
            }
        </div>  
    )
}

export default ResetPassword;