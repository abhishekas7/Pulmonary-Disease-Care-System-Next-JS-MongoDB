import express , { Router }from 'express'

import Register from '../controllers/user_controller.js';


const router = express.Router();

// router.post('/register',() => {
// console.log('hello');
// });

router.post('/register',Register)
// router.post('/register',Register)



export default router;