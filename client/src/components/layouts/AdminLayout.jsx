import React from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { FaUser } from "react-icons/fa6";
import { MdPermContactCalendar } from "react-icons/md";
import { AiFillCustomerService } from "react-icons/ai";
import { IoMdHome } from "react-icons/io";
import { useAuth } from '../../store/Auth';

const AdminLayout = () => {
  
  const {user, isLoading} = useAuth();
  console.log(user)
  
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(!user.isAdmin){
    return <Navigate to="/" />
  }
  return (
    <>
    <header>
      <div className="container">
        <nav>
          <ul>
            <li><NavLink to="/admin/users"><FaUser /> users</NavLink></li>
            <li><NavLink to="/admin/contacts"><MdPermContactCalendar /> Contacts</NavLink></li>
            <li><NavLink to="/service"><AiFillCustomerService /> Services</NavLink></li>
            <li><NavLink to="/"><IoMdHome /> Home</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
    <Outlet/>
    </>
  )
}

export default AdminLayout