
const express=require('express');

const router=express.Router();

const studentControllers=require('../controllers/studentControllers');

const verifyStudent=require('../middlewares/verifyStudent');

//get assigment list  

router.get('/',verifyStudent,studentControllers.assignmentList);

//add to list for submission

router.post('/addtomylist/:assignmentId',verifyStudent,studentControllers.addToMyList);

//my list of added assignment

router.get('/addedList',verifyStudent,studentControllers.addedAssignmentList);

//delete from added list of assignment

router.delete('/delete/:assignmentId',verifyStudent,studentControllers.deleteFromMyList);

//submit assignment to teacher

router.post('/submit/:assignmentId',verifyStudent,studentControllers.submitAssignment);

//edit the submitted assignment

router.put('/edit/:submitId',verifyStudent,studentControllers.editSubmission);

//get list of submitted assignment

router.get('/submitList',verifyStudent,studentControllers.getSubmitList);


module.exports=router;
