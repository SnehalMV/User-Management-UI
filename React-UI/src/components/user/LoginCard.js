import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import loginValidation from "../../utils/Validation/loginValidation";
import instance from "../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./Header";
import { login } from "../../utils/store/userSlice";


const LoginCard = () => {
  const user = useSelector(store => store.user)
  const navigate = useNavigate()
  const isLoggedIn = user.success
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    const response = await instance.post('/login', values)
    console.log(response.data);
    dispatch(login(response.data))
    navigate('/')
    
  }

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: onSubmit
  });

  useEffect(() => {
    if(isLoggedIn){
      navigate("/")
    }
  }, [isLoggedIn,navigate])

  return (
    <>
    <Header />
      <div className='flex justify-center items-center mt-24'>
        <div className='flex justify-center items-center h-96 w-96 bg-purple-100 rounded-3xl'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-center justify-between'>
              <span className='text-2xl font-thin ml-2 mb-2 p-2'>Login</span>
              <div className='flex flex-col mb-2'>
                <label className='ml-2 text-xs mb-1'>Email</label>
                <input className='ml-2 p-1' name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} />
                {errors.email && touched.email && <p className="text-red-600 text-xs ml-2">{errors.email}</p>}
              </div>
              <div className='flex flex-col mt-2'>
                <label className='ml-2 text-xs mb-1'>Password</label>
                <input className='ml-2 p-1' type="password" name="password" value={values.password} onBlur={handleBlur} onChange={handleChange} />
                {errors.password && touched.password && <p className="text-red-600 text-xs ml-2">{errors.password}</p>}
              </div>
              <button type="submit" className='ml-2 mt-5 p-2 text-xs bg-pink-200 rounded-lg hover:bg-pink-300 duration-200'>Login</button>
              <div className="flex items-center justify-center mt-2">
                <p className="text-xs">Don't have an Account?</p>
                <Link to="/signup"><p className="text-xs underline ml-1">Register</p></Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginCard