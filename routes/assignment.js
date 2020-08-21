const express=require('express');

const router=express.Router();

const verifyTeacher=require('../middlewares/verifyTeacher');

const assignmentController=require('../controllers/assignment');

router.get('/',verifyTeacher,assignmentController.getAssignments);

router.get('/:assignmentId',verifyTeacher,assignmentController.getAssignment);

router.post('/add_assignment',verifyTeacher,assignmentController.addAssignment);

router.put('/edit_assignment/:assignmentId',verifyTeacher,assignmentController.editAssignment);

router.delete('/delete_assignment/:assignmentId',verifyTeacher,assignmentController.deleteAssignment);

module.exports=router;
