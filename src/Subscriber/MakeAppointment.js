import React, { useState } from 'react';
import '../Main/App.css';
import DatePicker from 'react-datepicker';
import { makeAppointment } from '../api.js'
import "react-datepicker/dist/react-datepicker.css"
import {useHistory} from 'react-router-dom';

export const MakeAppointment = ()  =>  {
    const [startDate, setStartDate] = useState(new Date()); 
    const history = useHistory();
    const userId = localStorage.getItem("userId")
    const fullName = localStorage.getItem("name")
    const onSubmit = (e) => {
        e.preventDefault()
        const remarks = document.getElementById("remark").value;
        const location = document.getElementById("location").value;
        const body = {
            name: fullName,
            userId: userId,
            dateOfAppointment: startDate,
            remark: remarks,
            location: location,
            status: "Pending Acceptance"
        }       
        
        console.log(userId);

        makeAppointment(body).then((response) =>  {
            console.log(response);
            alert("Appointment made!")
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
                <h3>Make an appointment</h3>
                <form onSubmit={onSubmit}>
                <div className="form-group">
              <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="name">Date:</label>
                  </div>
                  <div className="col-sm-6">
                  <DatePicker 
                  selected={startDate} 
                  onChange={date => setStartDate(date)} 
                  showTimeSelect
                  timeFormat="p"
                  timeIntervals={15}
                  dateFormat="Pp"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="location">Location:</label>
                  </div>
                  <div className="col-sm-6">
                    <input type="location" name="location" id="location" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="remark">Remarks:</label>
                  </div>
                  <div className="col-sm-6">
                    <textarea name="remark" id="remark" />
                  </div>
                </div>
                </div>
                <div className="form-group">
                  <button type="submit" variant="outlined" className-="btn btn-primary">
                      Make Appointment
                  </button>
                </div>
            </form>
                </div>
       </div>
     );
}