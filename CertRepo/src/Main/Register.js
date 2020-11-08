import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

export const Register = () => {
    return (
    <div className="container" style={{marginLeft:550}}>
        <div className="mt-3">
            <h3>Register an account</h3>
            <form>
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
                    <input type="name" name="name" id="name" />
                  </div>
                </div>
              <div className="row">
                <div className="col-sm-1">
                  <label htmlFor="name">Highest Education:</label>
                </div>
                <div className="col-sm-6">
                <div class="dropdown show">
                      <DropdownButton
                         alignRight
                         title="Select Education"
                         id="dropdown-menu-align-right">
                                 <Dropdown.Item eventKey="option-1">PHD </Dropdown.Item>
                                 <Dropdown.Item eventKey="option-2">Masters Degree</Dropdown.Item>
                                 <Dropdown.Item eventKey="option-3">Bachelor's Degree</Dropdown.Item>
                                 <Dropdown.Item eventKey="option-4">High School Diploma</Dropdown.Item>
                                 <Dropdown.Item eventKey="option-5">GCE 'A' Levels</Dropdown.Item>
                                 <Dropdown.Item eventKey="option-6">GCE 'O' Levels</Dropdown.Item>
                                 <Dropdown.Item eventKey="option-7">GCE 'N' Levels</Dropdown.Item>
                                 <Dropdown.Item eventKey="option-8">Nitec/Higher Nitec</Dropdown.Item>
                                 <Dropdown.Item eventKey="option-9">PSLE</Dropdown.Item>
                         </DropdownButton>
                    </div>
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
                <div class="form-group">
                  <button type="submit" className-="btn btn-primary">
                      Register
                  </button>
                </div>
            </form>
        </div>
   </div>
 );
}
