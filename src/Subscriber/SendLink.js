import React, { useState } from 'react';
import '../Main/App.css';
import { sendLink } from '../api.js'
import "react-datepicker/dist/react-datepicker.css"
import {useHistory} from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const SendLink = ()  =>  {
    const [hrDepartment, setHrDepartment] = useState("All")
    const history = useHistory();
    const userId = localStorage.getItem("userId")
    const fullName = localStorage.getItem("name")
    const handleChange = (event) => {
        setHrDepartment(event.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const comment = document.getElementById("comment").value;
        const body = {
            name: fullName,
            userId: userId,
            HrDepartment: hrDepartment,
            comment: comment
        }       
        
        console.log(userId);

         sendLink(body).then((response) =>  {
             console.log(response);
             alert("Link sent!")
             history.push("/sendLink")
             window.location.reload();
           }).catch((error => {
             console.log("Error!:" +  error)
             alert("Something went wrong! Please contact the administrator.");
           }))
         };
    return (
        <div className="container" style={{marginLeft:550}}>
            <div className="mt-3">
                <h3>Send Link</h3>
                <form onSubmit={onSubmit}>
                <div className="form-group">
              <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="name">HR Department:</label>
                  </div>
                  <div className="col-sm-6">
                  <Select
                 labelId="filterCompany"
                 id="filterCompany"
                 value={hrDepartment}
                onChange={handleChange} >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Company1HR"}>Company #1 HR</MenuItem>
                <MenuItem value={"Company2HR"}>Company #2 HR</MenuItem>
             </Select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="comment">Comments:</label>
                  </div>
                  <div className="col-sm-6">
                    <textarea name="comment" id="comment" />
                  </div>
                </div>
                </div>
                <div className="form-group">
                  <button type="submit" variant="outlined" className-="btn btn-primary">
                      Send Link
                  </button>
                </div>
            </form>
                </div>
       </div>
     );
}