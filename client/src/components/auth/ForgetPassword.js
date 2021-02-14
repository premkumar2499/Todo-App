import React, { useState, useContext, useEffect,createContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import EmailContext from '../../context/userContext';
import Axios from "axios";



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
                    <p key={index}>{e.msg}</p>
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
            <div className="page">
                    { loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            {error}
                            <h2>Forget Password</h2>
                            <form className="form" onSubmit={submit}>
                                <input
                                id="email"
                                type="email"
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                                />

                                <input type="submit" value="Send Code" />
                            </form>
                        </>
                        )
                    }
                </div>
    )
}

export default ForgetPassword;