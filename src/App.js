import logo from './logo.svg';
import './App.css';
import Banner from './Pages/Home/Banner/Banner';
import Home from './Pages/Home/Home/Home';
import NavBar from './Pages/Shared/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/LoginSites/Login';




function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signup' element={<Login/>}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
