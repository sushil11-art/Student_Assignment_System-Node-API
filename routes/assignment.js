const express=require('express');

const router=express.Router();

const verifyTeacher=require('../middlewares/verifyTeacher');

const assignmentController=require('../controllers/assignment');

//get list of all added assigment 
router.get('/',verifyTeacher,assignmentController.getAssignments);

//get assignment by id
router.get('/:assignmentId',verifyTeacher,assignmentController.getAssignment);
// add assigment
router.post('/add_assignment',verifyTeacher,assignmentController.addAssignment);

//edit assignment
router.put('/edit_assignment/:assignmentId',verifyTeacher,assignmentController.editAssignment);

//delete assignment
router.delete('/delete_assignment/:assignmentId',verifyTeacher,assignmentController.deleteAssignment);

// get list of all assignments submitted by students
router.get('/List',verifyTeacher,assignmentController.getSubmittedList);

module.exports=router;
