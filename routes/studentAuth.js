const express=require('express')

const router=express.Router();

const studentAuth=require('../controllers/studentAuth');


router.post('/register',studentAuth.register);


router.post('/login',studentAuth.login);

module.exports=router;
