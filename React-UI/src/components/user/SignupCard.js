import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import signupValidation from "../../utils/Validation/signupValidation";
import instance from "../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../utils/store/userSlice";
import { useEffect } from "react";
import Header from "./Header";

const SignupCard = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(store => store.user.success)



  const onSubmit = async values => {
    const response = await instance.post('/signup', values);
    const user = response.data
    if (user.success) {
      dispatch(login(user))
      navigate('/')
    }


  }

  useEffect(() => {
    if(isLoggedIn){
      navigate("/")
    }
  }, [isLoggedIn, navigate])

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupValidation,
    onSubmit: onSubmit
  });

  return (
    <>
    <Header />
      <div className='flex justify-center items-center mt-24'>
        <div className='flex justify-center items-center h-[520px] w-96 bg-purple-100 rounded-3xl'>
          <div className='flex flex-col items-center justify-center'>
            <span className='text-2xl font-thin ml-2 mb-2 p-2'>Register</span>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col mb-2'>
                <label className='ml-2 text-xs mb-1'>Username</label>
                <input className='ml-2 p-1' name="username" value={values.username} onBlur={handleBlur} onChange={handleChange} />
                {errors.username && touched.username && <p className="text-red-600 text-xs ml-2">{errors.username}</p>}
              </div>
              <div className='flex flex-col mb-2'>
                <label className='ml-2 text-xs mb-1'>Email</label>
                <input className='ml-2 p-1 w-64' name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} />
                {errors.email && touched.email && <p className="text-red-600 text-xs ml-2">{errors.email}</p>}
              </div>
              <div className='flex flex-col mt-2'>
                <label className='ml-2 text-xs mb-1'>Password</label>
                <input type="password" name="password" className='ml-2 p-1' value={values.password} onBlur={handleBlur} onChange={handleChange} />
                {errors.password && touched.password && <p className="text-red-600 text-xs ml-2">{errors.password}</p>}
              </div>
              <div className='flex flex-col mt-2'>
                <label className='ml-2 text-xs mb-1'>Confirm Password</label>
                <input type="password" name="confirmPassword" className='ml-2 p-1' value={values.confirmPassword} onBlur={handleBlur} onChange={handleChange} />
                {errors.confirmPassword && touched.confirmPassword && <p className="text-red-600 text-xs ml-2">{errors.confirmPassword}</p>}
              </div>
              <button type="submit" className='ml-2 mt-5 p-2 text-xs bg-pink-200 rounded-lg hover:bg-pink-300 duration-200'>Signup</button>
              <div className="flex items-center justify-center mt-2">
                <p className="text-xs">Already have an Account?</p>
                <Link to="/login"><p className="text-xs underline ml-1">Login</p></Link>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default SignupCard