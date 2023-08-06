import jwt from 'jsonwebtoken'
import 'dotenv/config'
import userModel from '../models/userModel'

const adminEmail = 'admin@gmail.com'
const adminPass = '1234'
const key = process.env.JWT_SECRET_KEY

module.exports = {

  postAdminLogin: (req, res) => {
    const admin = req.body
    if (adminEmail === admin.email && adminPass === admin.password) {
      const token = jwt.sign({ adminId: adminEmail }, key, { expiresIn: "2h" });

      res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
      res.send({
        status: true,
        message: "Successful"
      })
    } else {
      res.send({
        status: false,
        message: "Unsuccessful"
      })
    }
  },

  postAdminLogout: (req, res) => {
    res.clearCookie("token")
    res.send({
      status: false,
      message: "Logout Successful"
    })
  },

  getAdminDash: async (req, res) => {
    const userList = await userModel.find({})
    res.send({
      users: userList
    })
  },

  postDeleteUser: (req, res) => {
    const id = req.params.id
    userModel.findByIdAndDelete({ _id: id }).then(async () => {
      const updatedList = await userModel.find({})
      res.send({
        users: updatedList
      })

    })
  },

  postEditUser: async (req, res) => {
    const id = req.params.id
    const { username, email } = req.body
    try{
      await userModel.findByIdAndUpdate(id, { username: username, email: email })
      const updatedList = await userModel.find({})
      console.log(updatedList);
      res.send({
        users: updatedList
      })

    }catch(error){
      console.log(error);
    }
  }

}