import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ fixed, user, pending, requests, profile, completed }) {
    const navigate = useNavigate();
    const [toggleMenu, setToggleMenu]= useState(false)
    const handleProfileClick = () => {
        user.usertype === "doctor" ? navigate("/doctorProfile") : navigate("/labprofile")
    }
    
    const handleRequestsClick = () => {
      navigate('/requests')
    }
    
    const handlePendingClick = () => {
      navigate('/pendingrequests')
    }
    
    const handleCompletedClick = () => {
      navigate('/completedrequests')
    }
    
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = '/';
    }
  return (
    <>

<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 " style={{background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'}}>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="" className="flex items-center">
            <img src="https://healthhelpline.com.np/assets/frontend/img/doctors/doctor-placeholder-male.jpg" className="mr-3 h-6 sm:h-9 rounded-full " alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ASistencia COVID-19</span>
          </a>
          <div className="flex items-center md:order-2">
            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="https://ipro.blob.core.windows.net/mydocuments/_20200921042919.png" alt="user photo" />
            </button>
            <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown" style={{position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(1246px, 850px)'}} data-popper-reference-hidden data-popper-escaped data-popper-placement="top">
              <div className="py-3 px-4">
                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul className="py-1" aria-labelledby="dropdown">
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>
            <button onClick={()=> setToggleMenu(!toggleMenu)} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
          </div>
          <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link to={'/'} style={{color: profile?'#1d4ed8':''}} className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 hover:text-blue-700 text-white "aria-current="page">Profile</Link>
              </li>
              <li>
                <Link to={'/requests'} style={{color: requests?'#1d4ed8':''}} className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 hover:text-blue-700 text-white ">Requests</Link>
              </li>
              <li>
                <Link to={'/pending'} style={{color: pending?'#1d4ed8':''}} className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 hover:text-blue-700 text-white ">Pending</Link>
              </li>
              <li>
                <Link to={'/completed'} style={{color: completed?'#1d4ed8':''}} className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 hover:text-blue-700 text-white ">Completed</Link>
              </li>
              <li>
                <Link to={'/'} className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 hover:text-blue-700 text-white ">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    {/* Before */}
      {/* <nav className="relative flex flex-row items-center justify-between px-2 py-3 bg-gray-900 mb-3">
      <div className="bg-gray-900 md:w-screen md:h-16 flex flex-row items-center gap-x-96">
        <h2 className="text-gray-100 font-extrabold tracking-wide text-2xl ml-16">
          ASistencia COVID-19
        </h2>
        <div className="text-gray-100 space flex space-x-5">
          <button type="button" className="hover:text-gray-300" onClick={() => handleProfileClick()}>Profile</button>
          <button type="button" className="hover:text-gray-300" onClick={() => handleRequestsClick()}>Requests</button>
          <button type="button" className="hover:text-gray-300" onClick={() => handlePendingClick()}>Pending</button>
          <button type="button" className="hover:text-gray-300" onClick={() => handleCompletedClick()}>Completed</button>
          <button type="button" className="hover:text-gray-300" onClick={() => handleLogout()}>Logout</button>
        </div>
      </div>
      </nav> */}
    </>
  );
}
