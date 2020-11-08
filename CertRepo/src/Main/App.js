import logo from '../logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom'
import { Login } from './Login'
import { Register } from './Register'

function App() {
  return (
    <div>
     <nav className="navbar bg-light navbar-expand-lg navbar-light">
       <ul className="navbar-nav mr-auto">
         <li className="navbar-item">
           <Link to="/login" className="nav-link">Login</Link>
         </li>
         <li className="navbar-item">
           <Link to="/create" className="nav-link">Register</Link>
         </li>
       </ul>
     </nav>
    <Switch>
      <Route path="/login" component={Login}/>
        <Route path="/create" component={Register}/>
    </Switch>
    </div>
  );
}

export default App;
