import * as yup from 'yup'

const passwordRules = /^(?=.*[A-Za-z0-9])[A-Za-z0-9!@#$%^&*()-_=+{}|;:'",.<>?[\]\\/]{6,}$/

const signupValidation = yup.object({
  username: yup.string().required("Required"),
  email: yup.string().email("Enter a Valid Email").required("Required"),
  password: yup.string().matches(passwordRules, {message:"1 special character and 6 characters"}).required("Required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Required"),
});


export default signupValidation