import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../../../utils/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../utils/store/adminSlice'

const AdminHeader = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(store => store.admin.status)

  const handleLogout = async () =>{
    await instance.post("/admin/logout")
    navigate('/admin')
    dispatch(logout())

  }

useEffect(() => {
  if(status){
    navigate('/admin/dash')
  }
},[status, navigate])



  return (
    <div className="flex items-center justify-between bg-zinc-400 p-2">
      {!status && <p className="text-xl font-light text-black p-2">Admin Login</p>}
      {status && <p className="text-xl font-light text-black">Admin Dashboard</p>}
      {(status) && <button className="text-xs p-2 m-2  bg-pink-200 rounded-lg hover:bg-pink-300 duration-200" onClick={handleLogout} >Logout</button>}
    </div>
  )
}

export default AdminHeader