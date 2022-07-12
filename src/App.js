import logo from './logo.svg';
import './App.css';
import LogIn from './components/LogIn'
import Clients from './components/Clients'
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom"



function App() {


  return (
    
      <Router>
          <Routes>
            <Route path="/login" element={<LogIn/>} />
            <Route path="/clients" element={<Clients/>} />
          </Routes>
      </Router>
  );
}


function Navigation() {
  return (
    <nav>
      <Link to="/login">LogIn</Link>
      <Link to="/user">User</Link>
    </nav>
  );
}

export default App;
