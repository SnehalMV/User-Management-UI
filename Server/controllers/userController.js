import bcrypt from 'bcrypt'
import userModel from '../models/userModel'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import cloudinary from '../utils/cloudinary'

const key = process.env.JWT_SECRET_KEY

module.exports = {

  postSignup: async (req, res) => {
    try {
      const { username, password, email } = req.body
      const userExists = await userModel.findOne({ email: email })
      if (userExists) {
        res.send({
          success: false,
          message: 'User Already Exists'
        })
      } else {
        if (username && password && email) {
          const hash = await bcrypt.hash(password, 10)
          const userDetails = new userModel({
            username: username,
            password: hash,
            email: email
          })

          await userDetails.save()

          const token = jwt.sign({ userId: userDetails._id }, key, { expiresIn: "2h" });

          res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })

          res.send({
            user: userDetails,
            success: true,
            message: "User Registered Successfully"

          })

        }
      }
    } catch {

    }

  },

  postLogin: async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email: email })
    if (user) {
      bcrypt.compare(password, user.password).then((response) => {
        if (response) {

          const token = jwt.sign({ userId: user._id }, key, { expiresIn: "2h" });

          res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
          res.send({
            user: { email: user.email, username: user.username },
            success: true
          })


        } else {
          res.send({
            user: null,
            success: false
          })
        }
      })

    } else {
      res.send({
        message: "User not registered"
      })
    }
  },

  postLogout: (req, res) => {
    res.clearCookie("token")
    res.send({
      success: false
    })
  },

  postUpload: async (req, res) => {
    const token = req.cookies.token;

    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          stream.write(fileBuffer);
          stream.end();
        });
      };

      const result = await streamUpload(req.file.buffer);
      const decoded = jwt.verify(token, key);
      const user = await userModel.findByIdAndUpdate(decoded.userId, {
        image: result.secure_url
      })
      return res.send({ message: "Profile picture updated successfully", user, success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

