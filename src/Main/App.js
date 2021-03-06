import logo from '../logo.svg';
import './App.css';
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import { Login } from './Login'
import { Register } from './Register'
import { UploadCert } from '../Subscriber/UploadCert'
import { MyCertificates } from '../Subscriber/MyCertificates'
import { MakeAppointment } from '../Subscriber/MakeAppointment'
import { MySubAppointments } from '../Subscriber/SubsAppointments'
import { WebAdminAllUsers } from '../WebAdmin/ManageAppt'
import { ForAdminCertificate } from '../WebAdmin/CertificatePage'
import { MyAppointments } from '../WebAdmin/MyAppointments'
import { ViewAllLinks } from '../HRAdmin/ViewLinks'
import { SendLink } from '../Subscriber/SendLink'
import { ViewCandidateProfile } from '../HRAdmin/ViewCandidateProfile'

function App() {  
  const history = useHistory();
  let currentPermission =  (localStorage.getItem("permission") == null || localStorage.getItem("permission") === '') ?  "" : localStorage.getItem("permission");
  let currUsername = localStorage.getItem("username");
  console.log(currentPermission);

  const onLogoutClick = () => {
    localStorage.setItem("permission", null)
    history.push("/login")
    window.location.reload();
  }
  
  return (
    <div>
      { (currentPermission == null || (currentPermission !== '1' && currentPermission !== '2' && currentPermission !== '3')) && (
     <nav className="navbar bg-light navbar-expand-lg navbar-light">
       <ul className="navbar-nav mr-auto">
         <li className="navbar-item">
           <Link to="/login" className="nav-link">Login</Link>
         </li>
         <li className="navbar-item">
           <Link to="/create" className="nav-link">Register</Link>
         </li>
       </ul>
     </nav>)
     }
     { (currentPermission === '1') && (
     <nav className="navbar bg-light navbar-expand-lg navbar-light">
       <ul className="navbar-nav mr-auto">
       <li className="navbar-item">
           <Link to="/myCertificates" className="nav-link">My Certificates</Link>
         </li>
         <li className="navbar-item">
           <Link to="/uploadCert" className="nav-link">Upload Certificate</Link>
         </li>
         <li className="navbar-item">
           <Link to="/MakeAppointment" className="nav-link">Make Appointment</Link>
         </li>
         <li className="navbar-item">
           <Link to="/SubsAppointments" className="nav-link">My Appointments</Link>
         </li>
         <li className="navbar-item">
           <Link to="/sendLink" className="nav-link">Send Link</Link>
         </li>
         <li className="navbar-item" onClick={onLogoutClick}>
         <Link to="/login" className="nav-link">Logout</Link>
         </li>
       </ul>
       <div style={{float: 'right'}}>
          <span>Welcome, {currUsername}!</span>
       </div>
     </nav>)
     }

      { (currentPermission === '2') && (
     <nav className="navbar bg-light navbar-expand-lg navbar-light">
       <ul className="navbar-nav mr-auto">
       <li className="navbar-item">
           <Link to="/ManageAppt" className="nav-link">All Users</Link>
         </li>
         <li className="navbar-item">
           <Link to="/MyAppointments" className="nav-link">Appointments</Link>
         </li>
         <li className="navbar-item" onClick={onLogoutClick}>
         <Link to="/login" className="nav-link">Logout</Link>
         </li>
       </ul>
       <div style={{float: 'right'}}>
          <span>Welcome, {currUsername}!</span>
       </div>
     </nav>)
     }

{ (currentPermission === '3' || currentPermission === 3) && (
     <nav className="navbar bg-light navbar-expand-lg navbar-light">
       <ul className="navbar-nav mr-auto">
       <li className="navbar-item">
           <Link to="/links" className="nav-link">All Links</Link>
         </li>
         <li className="navbar-item" onClick={onLogoutClick}>
         <Link to="/login" className="nav-link">Logout</Link>
         </li>
       </ul>
       <div style={{float: 'right'}}>
          <span>Welcome, {currUsername}!</span>
       </div>
     </nav>)
     }
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/create" component={Register}/>
      <Route path="/uploadCert" component={UploadCert}/>
      <Route path="/MyCertificates" component={MyCertificates}/>
      <Route path="/MakeAppointment" component={MakeAppointment}/>
      <Route path="/ManageAppt" component={WebAdminAllUsers}/>
      <Route path="/CertificatePage" component={ForAdminCertificate}/>
      <Route path="/MyAppointments" component={MyAppointments}/>
      <Route path="/SubsAppointments" component={MySubAppointments}/>
      <Route path="/links" component={ViewAllLinks}/>
      <Route path="/sendLink" component={SendLink}/>
      <Route path="/viewCandidateProfile" component={ViewCandidateProfile}/>
    </Switch>
    </div>
  );
}

export default App;
