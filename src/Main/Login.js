import React from 'react';
import { useHistory  } from 'react-router-dom'
export const Login = ()  =>  {
  const [value, setValue] = React.useState('');
  const history = useHistory();
  const onChange = event => {
    localStorage.setItem('permission', document.getElementById("username").value); 
    setValue( document.getElementById("username").value);
    history.push('/uploadCert')
    window.location.reload();
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
                  <button type="submit" onClick={onChange} className-="btn btn-primary">
                      Login
                  </button>
                </div>
            </form>
        </div>
   </div>
 );
}
