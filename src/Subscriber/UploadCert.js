import React from 'react';
import '../Main/App.css';


export const UploadCert = ()  =>  {
    return (
    <div className="container" style={{marginLeft:550}}>
        <div className="mt-3">
            <h3>Upload Certificate</h3>
            <p>Please upload your certificate in PDF.</p>
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
                  <button type="submit" className-="btn btn-primary">
                      Login
                  </button>
                </div>
            </form>
        </div>
   </div>
 );
}

