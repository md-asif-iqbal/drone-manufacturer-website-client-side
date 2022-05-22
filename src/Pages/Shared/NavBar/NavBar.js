import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const menuItems = <>
  
    <li className=' font-medium text-gray-500 hover:text-gray-900'><Link to="/" >Home</Link></li>
    <li className=' font-medium text-gray-500 hover:text-gray-900'><Link to="/parts" >Parts</Link></li>
    <li className=' font-medium text-gray-500 hover:text-gray-900'><Link to="/about" >About</Link></li>
    <li className=' font-medium text-gray-500 hover:text-gray-900'><Link  to="/contact" >Contact Us</Link></li>
    <li className=' font-medium text-indigo-600 hover:text-indigo-500'><Link to="/login" >Login</Link></li>
    
    </>
    return (
        <div class="navbar   bg-white relative">
              <div class="navbar-start">
                <div class="dropdown">
                  <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                  </label>
                  <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  {menuItems}
                  </ul>
                </div>
                <img alt="Workflow" class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/><span></span>
              </div>
              <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal p-0 ">
                  {menuItems}
                </ul>
              </div>
              <div class="navbar-end">
              {/* write here something */}
              </div>
        </div>
    );
};

export default NavBar;