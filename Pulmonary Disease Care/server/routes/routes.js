import express from 'express'
const router = express.Router();
import passport from 'passport';
import {RegUser,Regadmin,Oathuser,Logoutuser,testController} from '../controllers/user_controller.js'
import { Strategy as LocalStrategy } from 'passport-local';
import { SasiHandler,GetSasi,SingleValue} from '../controllers/sasi-controller.js';

import {isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'




router.post("/register",RegUser)
router.post("/admin",Regadmin);
router.post("/login",Oathuser)

router.post("/logout",Logoutuser);

//test routes
router.get("/test",isAdmin,requireSignIn, testController);

router.post("/sasi",SasiHandler)
router.get("/getsasi",GetSasi)
router.get("/getsasi/:das",SingleValue)







// router.post("/login",Oathuser);
// router.post(
//     '/login',
//     passport.authenticate('local', {
//       failureRedirect: '/login',
//       failureFlash: true,
//     }),
//     (req, res) => {
//       res.send('Logged in successfully!');
//     }
//   );











export default router