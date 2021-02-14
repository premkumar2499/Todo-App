import React,{useContext} from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext'

const Logout = () =>{
    const { loading,setLoading } = useContext(UserContext);
    const history = useHistory();
    try{
        setLoading(true);
        localStorage.removeItem("auth-token");
        setLoading(false);
    }
    catch(err){
        console.log(err);
    }
    finally{
        history.push('/')
        console.log("logout");
    }
}

export default Logout;