import React, { useState } from 'react'
import '../components/admin/Admin.css'
import AdminUsers from '../components/admin/AdminUsers'
import AdminConferences from '../components/admin/AdminConferences'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from "../components/LoadingSpinner"


function AdminMain() {

  const [bool, setBool] = useState(true);
  const navigate= useNavigate()
  const handleUsers = ()=>{
    const element1 = document.getElementById('i1');
    const element2 = document.getElementById('i2');
    const element3 = document.getElementById('i3');

      element1.classList.add('active')
      element2.classList.remove('active')
      element3.classList.remove('active')
}
const handleConferences = ()=>{
  const element1 = document.getElementById('i1');
  const element2 = document.getElementById('i2');
  const element3 = document.getElementById('i3');

    element1.classList.remove('active')
    element2.classList.add('active')
    element3.classList.remove('active')
}
const handleSignout = ()=>{
  const element1 = document.getElementById('i1');
  const element2 = document.getElementById('i2');
  const element3 = document.getElementById('i3');

    element1.classList.remove('active')
    element2.classList.remove('active')
    element3.classList.add('active')
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('id');

    navigate('/login')
}

  return (

    <div className='front' >
      <div className='adminsidebar' >
      <h3 className='logo' > ConfePlan </h3>
          <div className='adminsidebarmenu' >
            
            <div className='menulist' >
              <div className='item  active' id='i1' onClick={()=>{setBool(true);handleUsers()}} >Users Management</div>
              <div className='item' id='i2'  onClick={()=>{setBool(false);handleConferences()}} >Conferences Management</div>
              <div className='item' id='i3' onClick={()=>{handleSignout()}} >Log out</div>

            </div>
          </div>
        </div>
      <div className='cont' >
        {bool ? <AdminUsers /> 
              : <AdminConferences />}

      </div>
    </div>



  )
}

export default AdminMain