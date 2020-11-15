import React from 'react';
import { useHistory  } from 'react-router-dom'
import { findUser } from '../api.js'
import Button from "@material-ui/core/Button";

export const Login = ()  =>  {

  const history = useHistory();
  const onChange = () => {
   
    const body = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
     findUser(body)
     .then(response => response.json())
     .then(responseJson => {
    localStorage.setItem('permission', responseJson.userPermission); 
    localStorage.setItem('username', responseJson.username); 
    alert(responseJson.username)
    history.push('/uploadCert')
    window.location.reload();
     }).catch((error) => {
       alert(error)
     })
  
  };
    return (
    <div className="container" style={{marginLeft:550}}>
        <div className="mt-3">
            <h3>Login</h3>
            <form>
                <div className="form-group">
                <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="text">Username:</label>
                  </div>
                  <div className="col-sm-6">
                    <input type="text" name="text" id="username" />
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
                <div className="form-group">
                  <Button variant="outlined" onClick={onChange} className-="btn btn-primary">
                      Login
                  </Button>
                </div>
            </form>
        </div>
   </div>
 );
}
