import React, { useState, useContext} from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import RegisterContext from "../../context/userContext";
import Axios from "axios";
import Loading from '../../components/Loading/Loading'


const Register = () =>{
    const { userData,setUserData,loading,setLoading } = useContext(UserContext);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState([]);
    

    const history = useHistory();
    if(userData.status === 'active'){
      history.push("/");
    }
    else if(userData.status === 'pending'){
      history.push("/verify-mail");
    }
    const submit = async (e) => {
        e.preventDefault();
    
        try {
          setLoading(true);
          const newUser = { firstName, lastName, email, password, confirmPassword };
          console.log(newUser);
          
          const regUser = await Axios.post("/api/auth/register", newUser);
          if(regUser.data.errors){
            const err = regUser.data.errors.map(e =>{
              return (
                <div class="alert alert-danger">{e.msg}</div>
              )
            })
            setError(err);
          }
          else{
            localStorage.setItem("auth-token", regUser.data.accessToken);
            setUserData({
              token:regUser.data.accessToken
            })
            console.log(userData.token);
            history.push("/verify-mail");
          }
          console.log(regUser.data);
          setLoading(false);
        } catch (err) {
            console.log(err)
            err.response.data.msg && setError(err.response.data.msg);
        }
        
      };

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
                                  Prem Todos
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-body">
                            {error}
                            <form onSubmit={submit}>
                              <div className="form-group mb-1" id="formGroup">
                                <input
                                id="first-name"
                                placeholder="First Name"
                                className="form-control" 
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                                />
                              </div>

                              <div className="form-group mb-1" id="formGroup">
                                <input
                                id="last-name"
                                placeholder="Last Name"
                                className="form-control" 
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                                />
                              </div>
                              <div className="form-group mb-1" id="formGroup">
                                      <input
                                        id="email"
                                        type="email"
                                        className="form-control" 
                                        aria-describedby="emailHelp"
                                        placeholder="E-mail"
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
                              <div className="container">
                                <div className="row pt-2">
                                  <input type="submit" className="p-1 btn btn-primary" value="Register"/>
                                </div>
                              </div>
                              
                              <div className="container pt-2">
                                <div className="row">
                                    {/* <div className="col text-left">
                                        <Link to="/forget-password" className="active" style={{color: '#1a2e35'}}><i className="fa fa-user-plus"></i>Forgetten-Password?</Link>
                                        <button style="background-color: #1a2e35;" className="btn btn-primary">Log In</button> 
                                    </div> */}
                                    <div className="col text-right">
                                        <small className="form-text">Have An account?</small>
                                        <Link to="/login" className="active" style={{color: '#1a2e35'}}><i className="fa fa-user-plus"></i>Login</Link>
                                    </div>
                                </div>
                              </div>
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

export default Register;