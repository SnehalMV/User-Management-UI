import { Router } from "express";
import { postAdminLogin, postAdminLogout, getAdminDash, postDeleteUser, postEditUser } from "../controllers/adminController";
const router = Router()

router.post('/', postAdminLogin)
router.get('/dash', getAdminDash)
router.post('/logout', postAdminLogout)
router.post('/delete/:id', postDeleteUser)
router.post('/edit/:id', postEditUser)


export default router   