
const Assignment=require('../models/assignment');

const Teacher=require('../models/teacher');

const mongoose=require('mongoose');

const Submit=require('../models/submit_assignment');

exports.getAssignments=async(req,res,next)=>{
	try{

	const assignments=await Assignment.find({creator:mongoose.Types.ObjectId(req.user._id)});
		// console.log(assignments);

	res.status(200).json({message:'Assignmensts fetch successfully',assignments:assignments});
	// console.log('Hey iam working successfully');

	}
	catch(err){
	if(!err.statusCode){
		err.statusCode=500
		next(err);

	}
}
};

exports.addAssignment=async(req,res,next)=>{
	// const name=req.body.name;
	// const subject=req.body.subject;
	// const semester=req.body.semester;
	// const shift=req.body.shift;
	// const assignmentURL=req.body.assignmentURL;
	const {name,subject,semester,shift,assignmentURL,department}=req.body
		// const file=req.file;

	const selectedFile=req.file;

	const URL=selectedFile.path;

	const assignment=new Assignment({
		name:name,
		subject:subject,
		department:department,
		semester:semester,
		shift:shift,
		assignmentURL:URL,
		creator:req.user._id

	});
	try{
		await assignment.save();
		// var id = mongoose.Types.ObjectId('req.user._id');
		// const teacher= await Teacher.findOne({_id:id});
		const teacher=await Teacher.findById(req.user);
		if(!teacher){
			const error=new Error('Teacher not found');

			error.statusCode=404;

			throw error;
		}
		// console.log(teacher);
		// console.log(req.user._id);		
		if (!Array.isArray(teacher.assignment)) {
    		teacher.assignment = [];
		}
		teacher.assignment.push(assignment);
		await teacher.save();
		res.status(201).json({message:'Assignment created successfully',assignment:assignment});
	}
	catch(err){
		// console.log(err);
		if(!err.statusCode){
			err.statusCode=500;
			next(err);
		}
	}
	
};


exports.getAssignment= async (req,res,next)=>{
	const assignmentId=req.params.assignmentId;
	try{
	const assignment=await Assignment.findById(assignmentId);
		if(!assignment){
			//console.log('Assigment cant be fetched');
			const error=new Error('Assignment Not Found');

			error.statusCode=404;
		}
		if (assignment.creator.toString()!==req.user._id.toString())
		{
			// console.log('This assignment is not belongs to you')
			const error=new Error('You are not authorized');
			error.statusCode=403;
			throw error;
		}
		res.status(200).json({message:'Assignment fetched successfully',assignment:assignment});
	}
	catch(err)
	{
		if(!err.statusCode){
			err.statusCode=500;
			next(err);
		}

	}
};

exports.editAssignment= async (req,res,next)=>{
	const assignmentId=req.params.assignmentId;
	const assignment_name=req.body.assignment_name;
	const subject=req.body.subject;
	const semester=req.body.semester;
	const department=req.body.department;
	const shift=req.body.shift;
	const assignmentURL=req.file.path;
	try{
	const assignment=await Assignment.findById(assignmentId)
		if(!assignment){
			// console.log(err);
			const error=new Error('Assignment not found');
			error.statusCode=404;
			throw error;

		}
		if(assignment.creator.toString()!==req.user._id.toString()){
			// console.log('You are not authorized');
			const error=new Error('You are not authorized');

			error.statusCode=403;

			throw error;

		}
		assignment.assignment_name=assignment_name;
		assignment.subject=subject;
		assignment.semester=semester;
		assignment.department=department;
		assignment.shift=shift;
		assignment.assignmentURL=assignmentURL;
		const result = await assignment.save();
		res.status(201).json({message:'Assignment updated successfully',assignment:result});
	}
	catch(err){
			// console.log(err);
			if(!err.statusCode){
				err.statusCode=500;
				next(err);
			}

	}
};

exports.deleteAssignment=async(req,res,next)=>{
	const assignmentId=req.params.assignmentId;
	try{
	const assignment=await Assignment.findById(assignmentId)
		if(!assignment){
			const error=new Error('Assignment not found');

			error.statusCode=404;

			throw error;
		}
		await Assignment.deleteOne({_id:assignmentId,creator:req.user._id});
		res.status(200).json({message:'Assigment Deleted successfully'});
		// console.log('successfully deleted');
	}
	catch(err){
				// console.log(err);
		if(!err.statusCode){
				err.statusCode=500;
				next(err);
			}

	}
};

//get list of all assignments submitted by students
//for now i will get all the list later i will filter according to needs. 

exports.getSubmittedList=async(req,res,next)=>{
	try{

		const submittedList=await Submit.find({'teacher.teacherId':req.user._id});
		if(!submittedList){
			const error=new Error('No assignment was submiteed till now');
			error.statusCode=404;
			throw error;		
		}
		res.status(201).json({message:'List of submitted assignments for you',submittedList:submittedList});

	}
	catch(err){
	if(!err.statusCode){
				err.statusCode=500;
				next(err);
			}

	}

};




//


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

	


