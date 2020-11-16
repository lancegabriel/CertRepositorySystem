import React, { useState, useEffect } from 'react';
import '../Main/App.css';
import { loadAppointmentsById, deleteAppointmentById } from '../api.js'
import Button from "@material-ui/core/Button";
import Moment from 'moment';
import axios from 'axios';

export const MySubAppointments = ()  =>  {
    const [arrayOfAppointments, setArrayOfAppointments] = useState([]);
    const id = localStorage.getItem("userId")
    useEffect(() => {
        const loadAllAppointments = async () => {
            loadAppointmentsById(id).then(response=> response.json()).then(response => {
                  //  console.log(response)
               setArrayOfAppointments(response)
       }) 
    }
    loadAllAppointments()
}, [id])
    return (
        <div className="container">
            <div className="mt-3">
                <h3>My Appointments</h3>
                <table className="table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>Date Of Appointment</th>
                        <th>Proposed Location</th>
                        <th>Remark</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                           arrayOfAppointments != null &&  
                           arrayOfAppointments.map(appt =>
                            ( <tr key={appt._id}>
                                    <td>
                                        {Moment(appt.dateOfAppointment).format('DD/MM/YYYY hh:mm:A')}
                                    </td>
                                    <td>
                                        {appt.location}
                                    </td>
                                    <td>
                                        {appt.remark}
                                    </td>
                                    <td>
                                        {appt.status}
                                    </td>
                                    <td>
                                    {appt.status === 'Pending Acceptance' ? ( <div><Button id="accept"  variant="contained" color="primary" onClick={()=> {
                                       let id = appt._id
                                       axios.delete("http://localhost:4000/removeApptById/"+id).then(res => {
                                           alert("Appointment rescinded.")
                                           window.location.reload();
                                        console.log(res)
                                      }).catch((error => {
                                        console.log("Error!:" +  error)
                                        alert("Something went wrong! Please contact the administrator.");
                                         }))
                                       }} >Rescind</Button>&nbsp;
                                                 </div>)  :
                                                 (<Button disabled="true" id="reject" variant="contained" color="secondary">Rescind</Button>
                                                 )}
                                        {}
                                    </td>
                                </tr>
                            ))
                        } 
                    </tbody>
                </table>
                </div>
       </div>
     );
}