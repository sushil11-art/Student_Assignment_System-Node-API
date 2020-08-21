
const Assignment=require('../models/assignment');

const Student=require('../models/student');


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

	const student = await Student.findOne({_id:req.user});

	console.log(student.my_assignments);

	if(!student) return res.status(400).send('User not found');

	const assignment=await Assignment.findById(assignmentId);

	console.log(assignment);
	//const result=await student.addToMyList(assignment);
	student.my_assignments.assignments.push(assignment);

	await student.save();
	}
catch(err){
	console.log(err);
}

};