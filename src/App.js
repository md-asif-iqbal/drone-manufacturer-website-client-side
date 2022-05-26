import logo from './logo.svg';
import './App.css';
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
import DashBoard from './Pages/DashBoard/DashBoard';
import MyOrders from './Pages/DashBoard/MyOrders';
import AddReviews from './Pages/DashBoard/AddReviews';
import MyProfiles from './Pages/DashBoard/MyProfiles';
import Payments from './Pages/DashBoard/Payments';
import Blogs from './Pages/Blogs/Blogs';
import Users from './Pages/DashBoard/Admin/Users';

import RequireAdmin from './Pages/LoginSites/RequireAdmin';
import ManageOrders from './Pages/DashBoard/Admin/ManageOrders';
import AddProduct from './Pages/DashBoard/Admin/AddProduct';
import ManageProducts from './Pages/DashBoard/Admin/ManageProducts';






function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/allParts' element={<AllParts></AllParts>}></Route>
        <Route path='/blogs' element={<Blogs/>}></Route>
        <Route path='/purchase/:id' element={<RequireAuth><Purchase></Purchase>
        </RequireAuth>}></Route>
        <Route path='/dashboard' element={<RequireAuth>
          <DashBoard/> </RequireAuth>}>
        
          <Route path='myOrders' element={<MyOrders/>}/>
          <Route path='addReviews' element={<AddReviews/>}/>
          <Route index element={<MyProfiles/>}/>
          <Route path='payment/:id' element={<Payments/>}/>
          <Route path='makeAdmin' element={<RequireAdmin>
            <Users/>
          </RequireAdmin>}/>
          <Route path='manageOrder' element={<RequireAdmin>
            <ManageOrders></ManageOrders>
          </RequireAdmin>}/>
          <Route path='addProduct' element={<RequireAdmin>
            <AddProduct/>
          </RequireAdmin>}/>
          <Route path='manageProducts' element={<RequireAdmin>
            <ManageProducts/>
          </RequireAdmin>}/>

        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
