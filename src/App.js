import logo from './logo.svg';
import './App.css';
import Banner from './Pages/Home/Banner/Banner';
import Home from './Pages/Home/Home/Home';
import NavBar from './Pages/Shared/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/LoginSites/Login';
import SignUp from './Pages/LoginSites/SignUp';
import Footer from './Pages/Shared/Footer/Footer';
import Purchase from './Pages/Private/Purchase/Purchase';
import RequireAuth from './Pages/LoginSites/RequireAuth';
import Parts from './Pages/Home/Parts/Parts';
import AllParts from './Pages/AllParts/AllParts';
import NotFound from './Pages/Shared/NotFound/NotFound';




function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/allParts' element={<AllParts></AllParts>}></Route>
        <Route path='/purchase/:id' element={<RequireAuth>
          <Purchase></Purchase>
        </RequireAuth>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
