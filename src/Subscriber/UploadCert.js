import React from 'react';
import '../Main/App.css';
import { findUser } from '../api.js'
import { uploadCertificate } from '../api.js';
import Button from "@material-ui/core/Button";
import axios from 'axios';

export const UploadCert = ()  =>  {
  var fullFile = '';
  var user = '';
  
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
      "type": "formData"
    }
};
  const onFileChange = (e) =>  {
          fullFile = e.target.files[0];
  }

  const onSubmit = (e) => {
      e.preventDefault();
      const File = document.getElementById("file").value;
      const name = document.getElementById("name").value;
      const desc = document.getElementById("description").value;
      let username = localStorage.getItem("username");

      const body = {
        username: username
      }

      findUser(body)
      .then(response => response.json())
      .then(responseJson => {
          user = responseJson;
          console.log(user);
          var thefilename = "";
          if (File) {
            var startIndex = (File.indexOf('\\') >= 0 ? File.lastIndexOf('\\') : File.lastIndexOf('/'));
            thefilename = File.substring(startIndex);
            if (thefilename.indexOf('\\') === 0 || thefilename.indexOf('/') === 0) {
              thefilename = thefilename.substring(1);
            }
        }
          // const inBody = {
          //   id: user.id,
          //   theFile: fullFile,
          //   fileName: thefilename
          // }
          alert(user._id)
          const formData = new FormData()
          formData.append('theFile', fullFile);
          formData.append('fileName', thefilename);
          formData.append('id', user._id);
          formData.append('name', name);
          formData.append('description', desc)
           axios({
             method: 'post',
             url:"http://localhost:4000/uploadCertificate",
             headers: config.headers,
             data: formData,
           }).then(res => {
             console.log(res)
           }).catch((error => {
             console.log("Error!:" +  error)
             alert("Something went wrong! Please contact the administrator.");
              }))

       }).catch((error) => {
         alert(error)
       })
  }
    return (
    <div className="container" style={{marginLeft:550}}>
        <div className="mt-3">
            <h3>Upload Certificate</h3>
            <p>Please upload your certificate in PDF.</p>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="text">Upload Certificate:</label>
                  </div>
                  <div className="col-sm-6">
                  <input type="file" id="file" onChange={onFileChange} />
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
                    <label htmlFor="name">Description:</label>
                  </div>
                  <div className="col-sm-6">
                    <textarea name="description" id="description" />
                  </div>
                </div>
                </div>
                <div className="form-group">
                  <button type="submit" variant="outlined" className-="btn btn-primary">
                      Upload
                  </button>
                </div>
            </form>
        </div>
   </div>
 );
}

