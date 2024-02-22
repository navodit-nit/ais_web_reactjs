import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../assets/style.css";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';




function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // User Login info
  
  const errors = {
    uid: "Invalid  Username",
    pass: "Invalid Password",
    role: "Invalid Role"       
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uid, pass } = document.forms[0];
    // let body = {
    //               auditor_id: 109789,
    //              authToken: "1234567",
    //       };
    //       axios.post("http://127.0.0.1:8001/api/listDueAuditsForAuditor",body).then(response => {
    //         console.log(response);
    //         })
    //     .catch(function(error) {
    //     });
    // Compare user info
    if (email&& password && role ) {
      let body = {
        email: email,
         password: password,
         role:role
        };
        axios.post("http://127.0.0.1:8001/api/login",body).then(response => {
          if(response.data.error_code ==  0){
          navigate('/audits');
            sessionStorage.setItem("user", JSON.stringify(response.data.data));
        } 
        else{
          setErrorMessages({ name: "role", message: errors.role });
        }
        })
        .catch(function(error) {
          console.log(error);
        });
      // if (userData.password !== pass.value) {
      //   // Invalid password
      //   setErrorMessages({ name: "pass", message: errors.pass });
      // } else {
      //   setIsSubmitted(true);
      // }
    } else {
      // Username not found
      setErrorMessages({ name: "uid", message: errors.uid });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email Id</label>
          <input type="email" name="uid" required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
           />
          {renderErrorMessage("uid")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" value={password} name="pass" required onChange={(e) => setPassword(e.target.value)}  />
          {renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Login As </label>
          <span className="audit_type_button">
          <label><input type='radio' name="login_type" onChange={(e) => setRole(e.target.value)}  value="auditee" ></input>Auditee &nbsp; &nbsp;
        </label> 
          <label><input type='radio' name="login_type" onChange={(e) => setRole(e.target.value)}  value="auditor"></input>Auditor</label>
          </span>
         
          {renderErrorMessage("role")}
        </div>
        <div className="button-container ">
            <div >
          <button  className="forgot-pass"> Forgot Password</button>

            </div> &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;
            <div >
            <button type="submit"  className="sign-in"> Sign In </button>

            </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Employee Login</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;