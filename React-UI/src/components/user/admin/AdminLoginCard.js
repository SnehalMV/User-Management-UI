import { useFormik } from 'formik'
import loginValidation from '../../../utils/Validation/loginValidation';
import instance from '../../../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { login } from '../../../utils/store/adminSlice';
import { useNavigate } from 'react-router-dom';



const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async  () => {
    const response = await instance.post('/admin/', values)
    const { status } = response.data
    if(status){
      dispatch(login())
      navigate('/admin/dash')
    }
    
  }
  const { values, handleBlur, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: onSubmit
  });

  return (
    <div>
      <div>
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
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AdminLogin