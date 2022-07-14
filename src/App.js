
import './App.css';
import LogIn from './components/LogIn'
import Clients from './components/Clients'
import Access from './components/Access'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"



function App() {


  return (
    
      <Router>
          <Routes>
            <Route path="/login" element={<LogIn/>} />
            <Route path="/clients" element={<Clients/>} />
            <Route path="/access" element={<Access/>} />
          </Routes>
      </Router>
  );
}


// function Navigation() {
//   return (
//     <nav>
//       <Link to="/login">LogIn</Link>
//       <Link to="/user">User</Link>
//     </nav>
//   );
// }

export default App;
