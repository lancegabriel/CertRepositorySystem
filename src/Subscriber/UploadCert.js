import React from 'react';
import '../Main/App.css';
import Button from "@material-ui/core/Button";

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
                    <label htmlFor="text">Upload Certificate:</label>
                  </div>
                  <div className="col-sm-6">
                  <input type="file" />
                  </div>
                  </div>
                </div>
                <div className="form-group">
                  <Button variant="outlined" className-="btn btn-primary">
                      Upload
                  </Button>
                </div>
            </form>
        </div>
   </div>
 );
}

