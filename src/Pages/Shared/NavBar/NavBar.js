import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const NavBar = () => {
 const [user] = useAuthState(auth);
 const navigate = useNavigate();
 const logout = () =>{
   signOut(auth);
    navigate('/login')
   localStorage.removeItem('accessToken');

 }
    const menuItems = <>
  
    <li className=' font-medium text-gray-500 hover:text-gray-900'><Link to="/" >Home</Link></li>
    <li className=' font-medium text-gray-500 hover:text-gray-900'><Link to="/allParts" >Parts</Link></li>
    <li className=' font-medium text-gray-500 hover:text-gray-900'><Link to="/blogs">Blogs</Link></li>
    <li className=' font-medium text-gray-500 hover:text-gray-900 '><Link  to="/portfolio" >Portfolio</Link></li>
    {
        user && <li className=' font-medium text-gray-500 hover:text-gray-900'><Link to="/dashboard">Dashboard</Link></li>
    }
        <li>{user ? <button className= " btn btn-ghost font-medium text-gray-500 hover:bg-teal-300  hover:text-gray-700 hover:font-bold" onClick={logout} >Sign Out</button> : <Link to="/login">Login</Link>}</li>
    </>
    
    return (
        <div className="navbar   bg-white relative">
              <div className="navbar-start">
                <div className="dropdown">
                  <label tabIndex="0" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                  </label>
                  <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  {menuItems}
                  </ul>
                </div>
                <img alt="Workflow" className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/><span className='ml-5 font-medium'>DRONE Manufacture</span>
              </div>
              <div className="navbar-center ">
              
              </div>
              <div className="navbar-end">
              {/* write here something */}
              <label tabIndex="1" htmlFor="dashboard-sidebar" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul className="menu menu-horizontal hidden lg:flex p-0 mx-9 ">
                  {menuItems}
                </ul>
              </div>
        </div>
    );
};

export default NavBar;