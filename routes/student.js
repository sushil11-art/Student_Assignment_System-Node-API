
const express=require('express');

const router=express.Router();

const studentControllers=require('../controllers/studentControllers');

const verifyStudent=require('../middlewares/verifyStudent');

router.get('/',verifyStudent,studentControllers.assignmentList);

router.post('/addtomylist/:assignmentId',verifyStudent,studentControllers.addToMyList);

router.get('/addedList',verifyStudent,studentControllers.addedAssignmentList);

router.delete('/delete/:assignmentId',verifyStudent,studentControllers.deleteFromMyList);

module.exports=router;
