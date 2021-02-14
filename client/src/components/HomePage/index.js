import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Todos from '../Todos/index';

import UserContext from "../../context/userContext";
import Axios from 'axios'
import Loading from '../Loading/Loading';


const Home = () =>{
    const {userData, setUseData,loading,setLoading} = useContext(UserContext);
    const history = useHistory();
    useEffect(()=>{
        setLoading(true);
        if(userData.status === 'pending'){
            Axios.get("/api/auth/verification/get-activation-email", { headers: {"Authorization" : `Bearer ${userData.token}`} })
                .then((res)=>{
                    console.log(res.data);
                })
                .catch(err=>{
                    console.log(err);
                })
            history.push('/verify-mail');
        }   
        setLoading(false);
        console.log(userData);
    })
    
    return(
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            { loading ? (
                // <h1>Loading...</h1>
                <Loading/>
            ) : (
                    userData.userName ? (
                    <h1>Hi {userData.userName}</h1>
                    ) : (
                        <>
                            <div className="d-flex flex-column justify-content-evenly align-items-center h-25">
                                <h2 className="text-center">Welcome to your personalized TODO APP</h2>
                                <Link className="btn btn-outline-primary fs-4" to="/login">Log in</Link>  
                                <Link className="btn btn-outline-primary" to="/register">Register</Link>
                            </div>
                        </>
                   )
                )
            }
        </div>
    )
}

export default Home;