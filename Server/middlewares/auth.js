import jwt from "jsonwebtoken";

const key = process.env.JWT_SECRET_KEY

const auth = async (req, res, next) => {
  const token = req.cookies.token
  if(token){
    jwt.verify(token, key, (err, decode)=>{
      if(err){
        res.status(401).json({
          success:false,
          message:"Authentication Failed"
        })
      } else {
        next()
      }
    })
  } else {
    res.status(401).json({
      success:false,
      message:"Token not Found"
    })
  }
}

export default auth