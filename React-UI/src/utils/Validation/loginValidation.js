import * as yup from 'yup'

const loginValidation = yup.object({
  email: yup.string().email("Enter a Valid Email").required("Required"),
  password: yup.string().required("Required"),
})


export default loginValidation