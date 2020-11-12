import logo from '../logo.svg';
import './App.css';
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import { Login } from './Login'
import { Register } from './Register'
import { UploadCert } from '../Subscriber/UploadCert'

function App() {  
  const history = useHistory();
  let currentPermission =  (localStorage.getItem("permission") == null || localStorage.getItem("permission") === '') ?  "" : localStorage.getItem("permission");
  console.log(currentPermission);

  const onLogoutClick = () => {
    localStorage.setItem("permission", null)
    history.push("/login")
    window.location.reload();
  }
  
  return (
    <div>
      { (currentPermission == null || currentPermission !== '1') && (
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
           <Link to="/uploadCert" className="nav-link">Upload Certificate</Link>
         </li>
         <li className="navbar-item">
           <Link to="/makeAppointment" className="nav-link">Make Appointment</Link>
         </li>
         <li className="navbar-item">
           <Link to="/sendLink" className="nav-link">Send Link</Link>
         </li>
         <li className="navbar-item" onClick={onLogoutClick}>
         <Link to="/login" className="nav-link">Logout</Link>
         </li>
       </ul>
     </nav>)
     }
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/create" component={Register}/>
      <Route path="/uploadCert" component={UploadCert}/>
    </Switch>
    </div>
  );
}

export default App;
