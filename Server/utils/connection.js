import mongoose from "mongoose";

const db = () => {
  mongoose.connect('mongodb+srv://SnehalMV:snehal%40123@atlascluster.qlvycuc.mongodb.net/React-UI', {
    useNewUrlParser:true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected successfully");
  }).catch(() => {
    console.log("Error");
  })

}
export default db