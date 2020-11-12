import React from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown'
import {useHistory} from 'react-router-dom';
import {registerUser} from '../api.js';
import Button from "@material-ui/core/Button";

export const Register = () => {
  const history = useHistory();

  const onSubmit = () => {
    const body = {
      username:  document.getElementById("username").value,
      password:  document.getElementById("password").value,
      department:  document.getElementById("department").value,
      fullname:  document.getElementById("fullname").value,
      userPermission: 1
  }
      registerUser(body).then((response) =>  {
        console.log(response);
        alert("User successfully created!")
        localStorage.setItem('permission', 1); 
        history.push("/uploadCert")
        window.location.reload();
      }).catch((error => {
        console.log("Error!:" +  error)
        alert("Something went wrong! Please contact the administrator.");
      }))
    };


    return (
    <div className="container" style={{marginLeft:550}}>
        <div className="mt-3">
            <h3>Register an account</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="username">Username:</label>
                  </div>
                  <div className="col-sm-6">
                    <input type="username" name="username" id="username" />
                  </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1">
                      <label htmlFor="password">Password:</label>
                    </div>
                    <div className="col-sm-6">
                      <input type="password" name="password" id="password" />
                    </div>
                    </div>
                </div>
                <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="name">Name:</label>
                  </div>
                  <div className="col-sm-6">
                    <input type="fullname" name="fullname" id="fullname" />
                  </div>
                </div>
              <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="name">Department:</label>
                  </div>
                  <div className="col-sm-6">
                    <input type="department" name="department" id="department" />
                  </div>
                </div>
                <div className="form-group">
                  <Button variant="outlined" onClick={onSubmit} className="btn btn-primary">
                      Register
                  </Button>
                </div>
            </form>
        </div>
   </div>
 );
}
