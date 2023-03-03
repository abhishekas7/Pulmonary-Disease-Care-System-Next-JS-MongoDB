import express from 'express'
const router = express.Router();

import {RegUser,Regadmin,Oathuser} from '../controllers/user_controller.js'



router.post("/register",RegUser);
router.post("/admin",Regadmin);

router.post('/login',Oathuser)



// router.get("/abhi", (req, res) => {
//     res.json({message:'abhi'})
//   });

export default router