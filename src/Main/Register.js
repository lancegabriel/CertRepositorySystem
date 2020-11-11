import React from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown'
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import {registerUser} from '../api.js';

export const Register = () => {
  const {register, handleSubmit } = useForm();
  const history = useHistory();
  const onSubmit = handleSubmit((data) => {
      registerUser(data)
      history.push("/uploadCert")
      alert("User successfully created!")
      window.location.reload();
  })

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
                    <input ref={register} type="username" name="username" id="username" />
                  </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1">
                      <label htmlFor="password">Password:</label>
                    </div>
                    <div className="col-sm-6">
                      <input ref={register} type="password" name="password" id="password" />
                    </div>
                    </div>
                </div>
                <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="name">Name:</label>
                  </div>
                  <div className="col-sm-6">
                    <input ref={register} type="fullname" name="fullname" id="fullname" />
                  </div>
                </div>
              <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="name">Department:</label>
                  </div>
                  <div className="col-sm-6">
                    <input ref={register} type="department" name="department" id="department" />
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                      Register
                  </button>
                </div>
            </form>
        </div>
   </div>
 );
}
