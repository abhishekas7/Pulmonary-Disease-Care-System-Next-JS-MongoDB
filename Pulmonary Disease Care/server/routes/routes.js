import express from 'express'
const router = express.Router();
import passport from 'passport';
import {RegUser,Regadmin,Oathuser} from '../controllers/user_controller.js'
import { Strategy as LocalStrategy } from 'passport-local';



router.post("/register",RegUser)
router.post("/admin",Regadmin);
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