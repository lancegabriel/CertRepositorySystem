import React, { useState, useEffect } from 'react';
import '../Main/App.css';
import { loadUsers } from '../api.js'
import {useHistory} from 'react-router-dom';

export const WebAdminAllUsers = ()  =>  {
    const history = useHistory();
    const [arrayOfUsers, setArrayOfUsers] = useState([]);
    useEffect(() => {
        const loadAllUsers = async () => {
           let username = localStorage.getItem("username");
           const body = {
                   username: username
                 }
       loadUsers(body).then(response=> response.json()).then(response => {
            setArrayOfUsers(response)
       }) 
    }
            loadAllUsers()
}, [])
    return (
        <div className="container">
            <div className="mt-3">
                <h3>All users</h3>
                <table className="table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Department</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                           arrayOfUsers != null &&  
                           arrayOfUsers.map(cert =>
                            ( <tr key={cert._id}>
                                    <td>
                                        {cert.fullname}
                                    </td>
                                    <td>
                                        {cert.department}
                                    </td>
                                    <td>
                                        <a href="##" onClick={(e) => {
                                            localStorage.setItem("certId", cert._id)
                                            history.push('/certificatePage')
                                        }}>View</a>
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