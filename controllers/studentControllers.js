
const Assignment=require('../models/assignment');
const Student=require('../models/student');
const mongoose=require('mongoose');

exports.assignmentList= async(req,res,next)=>{

	try
	{
	//  to acess the property of student we find that student using req.user
	const student=await Student.findOne({_id:req.user});

	console.log(student.my_assignments.assignments);
	// console.log(student);
	// console.log(student.department);

	if (!student) return res.status(400).send('User not found');
	
	const assignments= await Assignment.find({department:student.department,semester:student.semester,shift:student.shift});
	res.json({message:'List of assignment for you category',assignments:assignments});

	}
	catch(err)
	{
		console.log(err);
	}
};

exports.addToMyList=async(req,res,next)=>{

	const assignmentId=req.params.assignmentId;
	try{
	// first find the student
	const student = await Student.findOne({_id:req.user});
	//console.log(student.my_assignments);
	if(!student) return res.status(400).send('User not found');
	// find the assignment
	const assignment=await Assignment.findById(assignmentId);
	// console.log(assignment);
	if(!assignment) return res.status(400).send('Required assignment not found');
	// filter the assignment to check whether that assignment already added to list
	const assignments=student.my_assignments.assignments.filter(assignment=>{
		return assignmentId.toString() === assignment._id.toString();
	})
	console.log(assignments);
	// if not added previosuly we will get and empty array then we push those assignment list in student model
	if (assignments === undefined || assignments.length == 0) {
    // array empty or does not exist
    		//return res.json({message:'Already added those assignments'});
    	student.my_assignments.assignments.push(assignment);
		await student.save();
		res.json({message:'Assignment added successfull tomy list',assignment:assignment});
		}
		res.json({message:'You have already added this assignment'})	
	
		}
		catch(err){
	console.log(err);
}
};

exports.addedAssignmentList=async(req,res,next)=>{
	try{
	const student = await Student.findOne({_id:req.user});
	if (!student) return res.status(400).send('User not authorized found');
	var data=[...student.my_assignments.assignments];
	console.log(data[0]._id);
	res.json({message:'List of pending assignments',assignments:data})

	// for(let i=0;i<=data.length;i++){
	// }
	// for(var i=0;i<=data.length;i++){
		// console.log(data[i]._id);
		// console.log(data[i]._id);
	// const assignments= await Assignment.find({_id:data[i]._id});
	// const myAssignments=[...assignments];
	// assignments.push(myAssignments);
	// console.log(myAssignments);
	// }
	// const assignments=student.my_assignments.assignments;
	}
catch(err){
	console.log(err);
}
};

exports.deleteFromMyList=async(req,res,next)=>{
	const assignmentId=req.params.assignmentId;
	try{
		const student =await Student.findOne({_id:req.user});
		if (!student) return res.status(400).send('User not authorized');
		const assignments=student.my_assignments.assignments.filter(assignment=>{
		return assignmentId.toString() !== assignment._id.toString();
		});
		// console.log(assignments);
		student.my_assignments.assignments=assignments
		await student.save();
		res.status(200).json({message:'Post deleted successfully'}); 		
	}
	catch(err){
		console.log(err);
	}

};
