const Assignment=require('../models/assignment');
const Teacher=require('../models/teacher');
const mongoose=require('mongoose');

exports.getAssignments=async(req,res,next)=>{
	try{
	const assignments=await Assignment.find({creator:mongoose.Types.ObjectId(req.user._id)});
	console.log(assignments);
	res.json({message:'Assignmensts fetch successfully',assignments:assignments});
		console.log('Hey iam working successfully');

	}
	catch(err){
	console.log(err);
}
};

exports.addAssignment=async(req,res,next)=>{
	// const name=req.body.name;
	// const subject=req.body.subject;
	// const semester=req.body.semester;
	// const shift=req.body.shift;
	// const assignmentURL=req.body.assignmentURL;
	const {name,subject,semester,shift,assignmentURL,department}=req.body;
	const assignment=new Assignment({
		name:name,
		subject:subject,
		department:department,
		semester:semester,
		shift:shift,
		assignmentURL:assignmentURL,
		creator:req.user._id

	});
	try{
		await assignment.save();
		// var id = mongoose.Types.ObjectId('req.user._id');
		// const teacher= await Teacher.findOne({_id:id});
		const teacher=await Teacher.findById(req.user);
		console.log(teacher);
		console.log(req.user._id);		
		if (!Array.isArray(teacher.assignment)) {
    		teacher.assignment = [];
		}
		teacher.assignment.push(assignment);
		await teacher.save();
		res.json({message:'Assignment created successfully',assignment:assignment});
	}
	catch(err){
		console.log(err);
	}
	
};


exports.getAssignment= async (req,res,next)=>{
	const assignmentId=req.params.assignmentId;
	try{
	const assignment=await Assignment.findById(assignmentId);
		if(!assignment){
			console.log('Assigment cant be fetched');
		}
		if (assignment.creator.toString()!==req.user._id.toString())
		{
			console.log('This assignment is not belongs to you')
		}
		res.json({message:'Assignment fetched successfully',assignment:assignment});
	}
	catch(err)
	{
	console.log(err);
	}
};

exports.editAssignment= async (req,res,next)=>{
	const assignmentId=req.params.assignmentId;
	const assignment_name=req.body.assignment_name;
	const subject=req.body.subject;
	const semester=req.body.semester;
	const department=req.body.department;
	const shift=req.body.shift;
	const assignmentURL=req.body.assignmentURL;
	try{
	const assignment=await Assignment.findById(assignmentId)
		if(!assignment){
			console.log(err);
		}
		if(assignment.creator.toString()!==req.user._id.toString()){
			console.log('You are not authorized');
		}
		assignment.assignment_name=assignment_name;
		assignment.subject=subject;
		assignment.semester=semester;
		assignment.department=department;
		assignment.shift=shift;
		assignment.assignmentURL=assignmentURL;
		const result = await assignment.save();
		res.json({message:'Assignment updated successfully',assignment:result});
	}
	catch(err){
			console.log(err);

	}
};

exports.deleteAssignment=async(req,res,next)=>{
	const assignmentId=req.params.assignmentId;
	try{
	const assignment=await Assignment.findById(assignmentId)
		if(!assignment){
			console.log(err);
		}
		await Assignment.deleteOne({_id:assignmentId,creator:req.user._id});
		res.json({message:'Assigment Deleted successfully'});
		console.log('successfully deleted');
	}
	catch(err){
				console.log(err);

	}
};


// exports.deleteAssignment=(req,res,next)=>{
// 	const assignmentId=req.params.assignmentId;
// 	Assignment.findById(assignmentId).then(assignment=>{
// 		if(!assignment){
// 			console.log(err);
// 		}
// 		return Assignment.findByIdAndRemove(assignmentId);
// 	}).then(result=>{
// 		res.json({message:'Assigment Deleted successfully'});
// 	}).catch(err=>{
// 		console.log(err);
// 	});
// };


// exports.editAssignment=(req,res,next)=>{
// 	const assignmentId=req.params.assignmentId;

// 	const assignment_name=req.body.assignment_name;
// 	const subject=req.body.subject;
// 	const semester=req.body.semester;
// 	const shift=req.body.shift;
// 	const assignmentURL=req.body.assignmentURL;

// 	Assignment.findById(assignmentId).then(assignment=>{
// 		if(!assignment){
// 			console.log(err);
// 		}
// 		assignment.assignment_name=assignment_name;
// 		assignment.subject=subject;
// 		assignment.semester=semester;
// 		assignment.shift=shift;
// 		assignment.assignmentURL=assignmentURL;
// 		return assignment.save();
// }).then(result=>{
// 	res.json({message:'Assignment updated successfully',assignment:result})
// }).catch(err=>{
// 	console.log(err);
// });

// };



// Retrive all assignments with then and catch

// exports.getAssignments=(req,res,next)=>{

// 	Assignment.find().then(assignments=>{
// 		res.json({'message':'Assignmensts fetch successfully',assignments:ssignments})

// 	}).catch(err=>{
// 		console.log(err);
// 	});

// };

//get single assignment

// exports.getAssignment=(req,res,next)=>{
// 	const assignmentId=req.params.assignmentId;
// 	Assignment.findById(assignmentId).then(assignment=>{
// 		if(!assignment){
// 			console.log('Assigment cant be fetched');
// 		}
// 		res.json({message:'Assignment fetched successfully',assignment:assignment});
// 	}).catch(err=>{
// 		console.log(err);
// 	});

// };


// Add a assignment


// exports.addAssignment=(req,res,next)=>{
// 	const assignment_name=req.body.assignment_name;
// 	const subject=req.body.subject;
// 	const semester=req.body.semester;
// 	const shift=req.body.shift;
// 	const assignmentURL=req.body.assignmentURL;
// 	const assignment=new Assignment({
// 		assignment_name:assignment_name,
// 		subject:subject,
// 		semester:semester,
// 		shift:shift,
// 		assignmentURL:assignmentURL});
// 	assignment.save().then(assignment=>{
// 		res.json({message:'Assignment created successfully',assignment:assignment});
// 	}).catch(err=>{
// 		console.log(err);
// 	});

// };

	


