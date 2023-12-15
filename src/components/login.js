import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../assets/style.css";
import axios from "axios";



function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uid: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uid, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uid.value);
    let body = {
            auditor_id: 109789,
            authToken: "1234567",
          };
          axios.post("http://127.0.0.1:8000/api/listDueAuditsForAuditor",body).then(response => {
            console.log(response);
            })
        .catch(function(error) {
            // manipulate the error response here
        });
    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uid", message: errors.uname });
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
          <label>Employee Id </label>
          <input type="number" name="uid" required />
          {renderErrorMessage("uid")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
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