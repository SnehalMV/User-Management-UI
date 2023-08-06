import { postSignup, postLogin, postLogout, postUpload } from '../controllers/userController'
import { Router } from "express";
import upload from '../middlewares/multer';
import auth from '../middlewares/auth';
const router = Router()

router.post('/signup',postSignup)
router.post('/login', postLogin)
router.post('/logout', postLogout)
router.post('/upload', upload.single("file"), auth, postUpload)

export default router