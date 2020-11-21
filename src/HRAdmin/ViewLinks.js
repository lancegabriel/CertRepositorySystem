import React, { useState, useEffect } from 'react';
import '../Main/App.css';
import { loadLinks } from '../api.js';
import {useHistory} from 'react-router-dom';

export const ViewAllLinks = ()  =>  {
    const history = useHistory();
    const [arrayOfLinks, setArrayOfLinks] = useState([]);
    useEffect(() => {
        const loadLink = async () => {
            loadLinks().then(response=> response.json()).then(response => {
                  //  console.log(response)
                  setArrayOfLinks(response)
       }) 
    }
    loadLink()

}, [])
    return (
        <div className="container">
            <div className="mt-3">
                <h3>All Links</h3>
                <table className="table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Comment</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                           arrayOfLinks != null &&  
                           arrayOfLinks.map(link =>
                            ( <tr key={link._id}>
                                    <td>
                                        {link.name}
                                    </td>
                                    <td>
                                        {link.comment}
                                    </td>
                                    <td>
                                        <a href="##" onClick={(e) => {
                                            localStorage.setItem("forLinkUserId", link.userId)
                                            history.push('/viewCandidateProfile')
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