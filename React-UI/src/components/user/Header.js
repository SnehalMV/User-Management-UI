import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import instance from "../../utils/axiosInstance"
import { logout } from "../../utils/store/userSlice"



const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const response = await instance.post('/logout')
    dispatch(logout(response.data.success))
    navigate('/')
  }

  const success  = useSelector(store => store.user.success)

  return (
    <div className="flex items-center justify-between bg-zinc-400 p-2">
      <Link to={"/"}><p className="text-xl font-light text-black">React UI</p></Link>
      {success && <button className="text-xs p-2 m-2  bg-pink-200 rounded-lg hover:bg-pink-300 duration-200" onClick={handleLogout}>Logout</button>}
      {!success && (
        <div>
          <Link to='/signup'><button className="text-xs p-2 m-2  bg-pink-200 rounded-lg hover:bg-pink-300 duration-200">Register</button></Link><Link to='/login'><button className="text-xs p-2 m-2  bg-pink-200 rounded-lg hover:bg-pink-300 duration-200">Login</button></Link>
        </div>)}

    </div>
  )
}

export default Header  