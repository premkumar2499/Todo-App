import React, { useState, useContext, useEffect } from "react";
import { useHistory,Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import Loading from "../Loading/Loading";


const Login = () =>{
    const { userData,setUserData, loading, setLoading } = useContext(UserContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    
    const history = useHistory();
    useEffect(()=>{
      if(userData.status === 'active'){
        history.push("/");
      }
      else if(userData.status === 'pending'){
        history.push("/verifymail");
      }
    });
    
    const submit = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
        const loginRes = await Axios.post("http://localhost:5000/api/auth/login", {
          email,
          password
        });
        if(loginRes.data.success){
          setUserData({
            token: loginRes.data.accessToken,
            status:loginRes.data.userStatus
          })
          localStorage.setItem("auth-token", loginRes.data.accessToken);
          history.push("/");
        }
        else{
            const err = loginRes.data.errors.map(e =>{
              return (
                <div class="alert alert-danger">{e.msg}</div>
              )
            })
            setError(err);
        }

        
      //   const loginRes = await Axios.post("http://localhost:5000/users/login", {
      //     email,
      //     password,
      //   });
      //   setUserData({
      //     token: loginRes.data.token,
      //     user: loginRes.data.user,
      //   });
      //   localStorage.setItem("auth-token", loginRes.data.token);
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
                    {error}
                    {/* <h2>Login</h2>
                    <form className="form" onSubmit={submit}>
                        <input
                        id="email"
                        type="email"
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        
                        <input
                        id="register-password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        <input type="submit" value="Login" />
                        <p>Dont have an Account?</p><Link to="/register">Log in</Link>
                        <Link to="/forget-password">Forgetten-password?</Link>
                    </form> */}
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div className="container">
                              <div className="row">
                                <div className="col font-weight-bold fs-2">
                                  Prem Todos
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-body">
                              <form onSubmit={submit}>
                              <div className="form-group " id="formGroup">
                                      <input
                                      id="email"
                                      type="email"
                                      className="form-control" 
                                      aria-describedby="emailHelp"
                                      placeholder="E-mail"
                                      onChange={(e) => setEmail(e.target.value)}
                                      />
                                <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
                              </div>
                              <div className="form-group">
                                <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                              </div>
                              <div className="container">
                                <div className="row pt-2">
                                  <input type="submit" className="p-1 btn btn-primary" value="Login" />
                                </div>
                              </div>
                              
                              <div className="container pt-2">
                                <div className="row">
                                    <div className="col text-left">
                                        <Link to="/forget-password" className="active" style={{color: '#1a2e35'}}><i className="fa fa-user-plus"></i>Forgetten-Password?</Link>
                                        {/* <button style="background-color: #1a2e35;" className="btn btn-primary">Log In</button> */}
                                    </div>
                                    <div className="col text-right">
                                        <small className="form-text">Don't have An account?</small>
                                        <Link to="/register" className="active" style={{color: '#1a2e35'}}><i className="fa fa-user-plus"></i>Register here</Link>
                                    </div>
                                </div>
                              </div>
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

export default Login;