import React, { useState, useEffect } from 'react';
import '../Main/App.css';
import { getUserInfoById, getCertByStatus } from '../api.js'
import "react-datepicker/dist/react-datepicker.css"

export const ViewCandidateProfile = ()  =>  {
    const [certs, setCerts] = useState([])
    const [currUser, setCurrUser] = useState([]);
    useEffect(() => {
        const loadCerts = async () => {
       const id = localStorage.getItem("forLinkUserId")
        const secondBody = {
            id: id
        }
         const data2 =  await getUserInfoById(secondBody).then(response=>response.json())
         if (data2[0]) {
         setCurrUser(data2[0])
         }
         const certBody = {
            id: id,
            status: "Approved"
        }
         getCertByStatus(certBody).then(response => response.json()).then(response => {
            console.log(response)
            var array = response[0].certificates;
            var newArray = []
            for (var i = 0; i < array.length; i++) {
                    if (array[i].status === "Approved") {
                        newArray.push(array[i])
                        console.log(array[i])
                    }
            }
            setCerts(newArray)
        }).catch(err => {
            alert(err)
        })
     }
         loadCerts()
}, [])
    return (
        <div className="container" >
            <div className="mt-3">
                <h3>{currUser.fullname}'s Information</h3>
                <div className="form-group">
              <div className="row">
                  <div className="col-sm-1">
                    <label>Name:</label>
                  </div>
                  <div className="col-sm-6">
                 <label>{currUser.fullname}</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1">
                    <label>Department:</label>
                  </div>
                  <div className="col-sm-6">
                  <label>{currUser.department}</label>
                  </div>
                </div>
                 </div>
                </div>
            <div className="mt-3">
                <h3>All Approved Certificates</h3>
                <table className="table table-striped mt-3">
                    <thead>
                    <tr>
                    <th>Certificate Name</th>
                        <th>Description</th>
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


