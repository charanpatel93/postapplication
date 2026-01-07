import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Activities from './components/Activities';
import Tonavigation from './components/Tonavigation';
import Taskss from './components/Taskss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path='/' element={<Login />} />
          <Route path='/Activities' element={<Activities />} />
          <Route path='/Taskss' element={<Taskss/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
