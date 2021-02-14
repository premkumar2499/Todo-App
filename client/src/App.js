import React from 'react';
import HomePage from './components/HomePage/index'
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState,useEffect } from 'react';
import Axios from 'axios';
import UserContext from "./context/userContext";
import Home from './components/HomePage/index'
import Login from './components/auth/Login';
import Register from './components/auth/Register'
import ActivateAccount from './components/auth/ActivateAccount';
import VerifyMail from './components/auth/VerifyMail';
import ForgetPassword from './components/auth/ForgetPassword';
import ResetPassword from './components/auth/ResetPassword'
import Header from './components/Header/Header'
import Logout from './components/auth/Logout';

// export const UserContext = React.createContext()

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    status: undefined,
    userName:undefined,
    todos:[],
  });
  const [loading,setLoading] = useState(true);
  const [email,setEmail] = useState();
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "/api/auth/validate-token",
        null,
        { headers: {"Authorization" : `Bearer ${token}`} }
      );
      
      if (tokenRes.data) {
        let userRes;
        if(tokenRes.data.userStatus==='active'){
          userRes = await Axios.get("/api/auth/todos", { headers: {"Authorization" : `Bearer ${token}`}
        });          
        }
        // console.log(userRes);
        setUserData({
          token,
          status: tokenRes.data.userStatus,
          userName :userRes ? userRes.data.name : undefined,
          todos : userRes ? userRes.data.todos : []
        });
      }
      setLoading(false);
      // console.log("from APP",userData);
    };

    checkLoggedIn();
  }, []);
  

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData, loading, setLoading, email,setEmail}}>
          <Header />
          {/* <div className="container-fluid"> */}
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/verify-mail" component={VerifyMail} />
              <Route path="/verify-account/:userId/:secretCode" component={ActivateAccount} />
              <Route path="/forget-password" component={ForgetPassword} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/logout" component={Logout}/>
            </Switch>
          {/* </div> */}
          </main>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
  // const [userData, setUserData] = useState({
  //   token: undefined,
  //   user: undefined,
  // });

  // console.log(userData);
  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     let token = localStorage.getItem("auth-token");
  //     if (token === null) {
  //       localStorage.setItem("auth-token", "");
  //       token = "";
  //     }
  //     const tokenRes = await Axios.post(
  //       "http://localhost:5000/api/auth/validate-token/",
  //       null,
  //       { headers: { "x-access-token": token } }
  //     );
  //     if (tokenRes.data) {
  //       const userRes = await Axios.get("http://localhost:5000/", {
  //         headers: { "x-access-token": token },
  //       });
  //       setUserData({
  //         token,
  //         user: userRes.data,
  //       });
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);


  // return (
  //   <div className="App">
  //     <HomePage />
  //     <BrowserRouter>
  //       <UserContext.Provider value={ userData, setUserData }>
  //         {/* <Header /> */}
  //         <div className="container">
  //           <Switch>
  //             <Route exact path="/" component={Home} />
  //             <Route path="/login" component={Login} />
  //             <Route path="/register" component={Register} />
  //           </Switch>
  //         </div>
  //       </UserContext.Provider>
  //     </BrowserRouter>
  //   </div>
  // );
}

export default App;
