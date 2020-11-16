import React, { useState, useEffect } from 'react';
import '../Main/App.css';
import { loadAppointments } from '../api.js'
import {useHistory} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Moment from 'moment';

export const MyAppointments = ()  =>  {
    const history = useHistory();
    const [arrayOfAppointments, setArrayOfAppointments] = useState([]);
    useEffect(() => {
        const loadAllAppointments = async () => {
                loadAppointments().then(response=> response.json()).then(response => {
                  //  console.log(response)
               setArrayOfAppointments(response)
       }) 
    }
    loadAllAppointments()
}, [])
    return (
        <div className="container">
            <div className="mt-3">
                <h3>All Appointments</h3>
                <table className="table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date Of Appointment</th>
                        <th>Proposed Location</th>
                        <th>Remark</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                           arrayOfAppointments != null &&  
                           arrayOfAppointments.map(appt =>
                            ( <tr key={appt._id}>
                                    <td>
                                        {appt.name}
                                    </td>
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
                                    {appt.status === 'Pending Acceptance' ? ( <div><Button id="accept"  variant="contained" color="primary" >Accept</Button>&nbsp;
                                                 <Button id="reject" variant="contained" color="secondary">Reject</Button></div>)  :
                                                 (<Button id="reject" variant="contained" color="secondary">Reject</Button>
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