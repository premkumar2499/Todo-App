import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Todos from '../Todos/index';
import Menu from './Menu';
import UserContext from "../../context/userContext";
import Axios from 'axios'
import Loading from '../Loading/Loading';


const Home = () =>{
    const {userData, setUseData,loading,setLoading} = useContext(UserContext);
    const history = useHistory();
    useEffect(()=>{
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
        console.log(userData);
    })
    
    
    const [isOpen,setIsOpen] = useState(false);
    const handleMenu = () =>{
        setIsOpen(!isOpen);
    }
    return(
        <div>
            { loading ? (
                // <h1>Loading...</h1>
                <Loading/>
            ) : (
                    userData.userName ? (
                    <h1>Hi {userData.userName}</h1>
                    ) : (
                        <>
                            
                            <h1>Welcome to your personalized TODO APP</h1>
                            <div className="btn-group">
                                <button class="login"><Link to="/login">Log in</Link></button>  
                                <button class="register"><Link to="/register">Register</Link></button>  
                            </div>
                        </>
                   )
                )
            }
            
        </div>
        
        // <div>
        //     <nav className="navbar">
        //         <div className="nav-brand" onClick={()=>handleMenu()}>
        //             T
        //         </div>
        //         <div className="nav-title">
        //             Prem Todo
        //         </div>
        //     </nav>
        //     {isOpen && <Menu handleMenu={handleMenu}/>}
        //     <Todos/>
        //     <button class="add-todo">ADD TODO</button>  
        // </div>
    //     <div className="page">
    //   {userData.user ? (
    //     <h1>Welcome {userData.user.displayName}</h1>
    //   ) : (
    //     <>
    //       <h2>You are not logged in</h2>
    //       <Link to="/login">Log in</Link>
    //     </>
    //   )}
    // </div>
    )
}

export default Home;