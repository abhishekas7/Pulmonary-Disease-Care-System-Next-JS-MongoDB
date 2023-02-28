import express , { Router }from 'express'

import { RegUser } from '../controllers/user_controller.js';


const router = express.Router();

// router.post('/register',() => {
// console.log('hello');
// });

router.post('/register',RegUser)


export default router;