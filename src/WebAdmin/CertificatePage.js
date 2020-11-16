import React, { useState, useEffect } from 'react';
import '../Main/App.css';
import { getUserInfoById, updateCertificate } from '../api.js'
import Button from "@material-ui/core/Button";

export const ForAdminCertificate = ()  =>  {
    const [user, setUser] = useState([])
    const [certs, setCerts] = useState([])
    const [currUser, setCurrUser] = useState()
    const onUpdateClick = (certObj, value) => {
        console.log(certObj)
        var thisStatus = ""
        if (value.target.innerHTML === "Approve") {
            thisStatus = "Approved"
        } else {
            thisStatus = "Rejected"
        }
        const body = {
            id: user._id,
            certId: certObj._id,
            status: thisStatus
        }
      //  console.log(JSON.stringify(body))
        updateCertificate(body).then(response=> {
            alert("Certificate updated!")
            window.location.reload();
        }).catch(err => {
            alert(err)
        })
    }
    useEffect(() => {
        const loadCerts = async () => {
            const id = localStorage.getItem("certId")
        const secondBody = {
            id: id
        }
         const data2 =  await getUserInfoById(secondBody).then(response=>response.json())
         if (data2[0]) {
         setCerts(data2[0].certificates)
         setUser(data2[0])
         setCurrUser(data2[0].fullname)
         }
            }
         loadCerts()
}, [])
    return (
        <div className="container">
            <div className="mt-3">
                <h3>{currUser}'s Certificates</h3>
                <table className="table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>Certificate Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Link</th>
                        <th>Action</th>         
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
                                    <td>
                                    {cert.status === 'Pending Approval' ? ( <div><Button id="approve"  variant="contained" color="primary" onClick={onUpdateClick.bind(cert, cert)} >Approve</Button>&nbsp;
                                                 <Button id="reject" variant="contained" color="secondary" onClick={onUpdateClick.bind(cert, cert)}>Reject</Button></div>) : 
                                                 (<Button id="reject" variant="contained" color="secondary" onClick={onUpdateClick.bind(cert, cert)}>Reject</Button>
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