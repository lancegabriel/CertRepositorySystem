import React, { useState, useEffect } from 'react';
import '../Main/App.css';
import { getUserInfoById, findUser, downloadFile } from '../api.js'

export const MyCertificates = ()  =>  {
    const [user, setUser] = useState([])
    const [certs, setCerts] = useState([])
    useEffect(() => {
        const loadCerts = async () => {
           let username = localStorage.getItem("username");
           const body = {
                   username: username
                 }
        const data1 = await findUser(body).then(response=>response.json())
        setUser(data1);
        const secondBody = {
            id: user._id
        }
         const data2 =  await getUserInfoById(secondBody).then(response=>response.json())
         if (data2[0]) {
         setCerts(data2[0].certificates)
         }
            }
         loadCerts()
}, [user._id])
    return (
        <div className="container">
            <div className="mt-3">
                <h3>My uploaded certificates</h3>
                <table className="table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>Certificate Name</th>
                        <th>Description</th>
                        <th>Verification Status</th>
                        <th>Link</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                           certs != null &&  
                            certs.map(cert => (
                                <tr key={cert._id}>
                                    <td>
                                        {cert.name}
                                    </td>
                                    <td>
                                        {cert.description}
                                    </td>
                                    <td>
                                        {cert.status}
                                    </td>
                                    <td>
                                        <a href={"http://localhost:4000/download/" + cert.pdfUrl} download="Certificate">Download</a>
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