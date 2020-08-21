const express=require('express')

const router=express.Router();

const authController=require('../controllers/teacherAuth');

// const verify=require('./verifyTeacher');


router.post('/register',authController.register);


router.post('/login',authController.login);

module.exports=router;
