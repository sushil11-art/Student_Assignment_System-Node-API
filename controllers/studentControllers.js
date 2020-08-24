
const Assignment=require('../models/assignment');
const Student=require('../models/student');
const Submit=require('../models/submit_assignment');
const Teacher=require('../models/teacher');

const mongoose=require('mongoose');

exports.assignmentList= async(req,res,next)=>{
	try
	{
	//  to acess the property of student we find that student using req.user
	const student=await Student.findOne({_id:req.user});

	console.log(student.my_assignments.assignments);
	// console.log(student);
	// console.log(student.department);

	if (!student){
		// return res.status(404).json({message:'User not found'});
		const error =Error('User not found');
		error.statusCode=404;
		throw error;

	}
	const assignments= await Assignment.find({department:student.department,semester:student.semester,shift:student.shift});
	res.status(200).json({message:'List of assignment for you category',assignments:assignments});

	}
	catch(err)
	{
		if(!err.statusCode){
				err.statusCode=500;
				next(err);
			}	}
};

exports.addToMyList=async(req,res,next)=>{

	const assignmentId=req.params.assignmentId;
	try{
	// first find the student
	const student = await Student.findOne({_id:req.user});
	//console.log(student.my_assignments);
	// if (!student) return res.status(404).json({message:'User not found'});
	if (!student){
		// return res.status(404).json({message:'User not found'});
		const error =Error('User not found');
		error.statusCode=404;
		throw error;
	}
	// find the assignment
	const assignment=await Assignment.findById(assignmentId);
	// console.log(assignment);
	if(!assignment){
		//  return res.status(404).json({message:'Required assignment not found'});
		const error =Error('Required assignment not found');
		error.statusCode=404;
		throw error;
		}	
	// filter the assignment to check whether that assignment already added to list
	const assignments=student.my_assignments.assignments.filter(assignment=>{
		return assignmentId.toString() === assignment._id.toString();
	})
	// console.log(assignments);
	// if not added previosuly we will get and empty array then we push those assignment list in student model
	if (assignments === undefined || assignments.length == 0) {
    // array empty or does not exist
    		//return res.json({message:'Already added those assignments'});
    	student.my_assignments.assignments.push(assignment);
		await student.save();
		res.status(201).json({message:'Assignment added successfull to my list',assignment:assignment});
		}
		res.json({message:'You have already added this assignment'});
	
		}
		catch(err){
		if(!err.statusCode){
				err.statusCode=500;
				next(err);
			}}
};



exports.addedAssignmentList=async(req,res,next)=>{
	try{
	const student = await Student.findOne({_id:req.user});
	if (!student){
	 // return res.status(400).send('User not authorized found');
	 const error =Error('User not found');
		error.statusCode=404;
		throw error;

	}
	var data=[...student.my_assignments.assignments];
	console.log(data[0]._id);
	res.status(200).json({message:'List of pending assignments',assignments:data})
	// for(var i=0;i<=data.length;i++){
		// console.log(data[i]._id);
		// console.log(data[i]._id);
	// const assignments= await Assignment.find({_id:data[i]._id});
	// }
	// const assignments=student.my_assignments.assignments;
	}
catch(err){
	if(!err.statusCode){
				err.statusCode=500;
				next(err);
			}}
};

exports.deleteFromMyList=async(req,res,next)=>{
	const assignmentId=req.params.assignmentId;
	try{
		const student =await Student.findOne({_id:req.user});
		if (!student){
	 // return res.status(404).json({message:'User not found'});

		const error =new Error('Student not found');
		error.statusCode=404;
		throw error;
		}
		const assignments=student.my_assignments.assignments.filter(assignment=>{
		return assignmentId.toString() !== assignment._id.toString();
		});
		// console.log(assignments);
		student.my_assignments.assignments=[...assignments];
		await student.save();
		res.status(200).json({message:'Assignment deleted successfully'}); 		
	}
	catch(err){
		if(!err.statusCode){
				err.statusCode=500;
				next(err);
			}	}

};

exports.submitAssignment=async(req,res,next)=>{
	const assignmentId=req.params.assignmentId;
	const selectedFile=req.file;
	const URL=selectedFile.path;
	try{
		const student=await Student.findOne({_id:req.user});
		if (!student){
			const error=new Error('Student not found');
			error.statusCode=404;
			throw error;
		}
		const assignment=await Assignment.findById(assignmentId);
		if (!assignment){
			const error=new Error('Submission date passed on ');
			error.status=404;
			throw error;
		}
		//console.log(assignment.creator)
		const teacherId=assignment.creator
		const teacher=await Teacher.findById(teacherId);
		const myList=await Submit.find({'assignment.assignmentId':assignmentId,'student.studentId':req.user._id});
		// console.log(myList);
		if(!(myList===undefined || myList.length==0)){
			const error=new Error('You have already submitted this assignment');
			error.status=400;
			throw error;
		}
		const submit=new Submit({
			student:{
			name:student.name,
			email:student.email,
			department:student.department,
			semester:student.semester,
			college_rollno:student.college_rollno,
			shift:student.shift,
				name:assignment.name,
				studentId:mongoose.Types.ObjectId(req.user._id)
			},
			assignment:{
			subject:assignment.subject,
				assignmentId:mongoose.Types.ObjectId(assignmentId)
			},
			pdfURL:URL,
			teacher:{
			name:teacher.name,
			email:teacher.email,
			teacherId:mongoose.Types.ObjectId(teacherId)
				}
		});
		await submit.save()
		res.status(201).json({message:'You have successfully submitted the assignment',submit:submit});
		
	}
	catch(err){
		if (!err.statusCode){
			err.statusCode=500;
			next(err);
		}
	}
};

	

exports.getSubmitList=async(req,res,next)=>{
	try{
		const submitList=await Submit.find({'student.studentId':req.user._id});
		console.log(submitList);
		if(!submitList){
			const error=new Error('You dont have any submitted assignments');
			error.statusCode=404;
			throw error;
		}
		res.status(200).json({message:'List of submitted assignments',submitList:submitList});

	}
	catch(err){
		if(!err.statusCode){
			err.statusCode=500
			next(err);
		}

	}

};

exports.editSubmission=async(req,res,next)=>{

	const submitId=req.params.submitId;

	const selectedFile=req.file;

	const URL=selectedFile.path;

	try{	
		const submit=await Submit.findOneAndUpdate({_id:submitId,'student.studentId':req.user._id},{
			$set:{
				pdfURL:URL
			}
		},{upsert:true});

		// const submit =await Submit.find({_id:submitId});
		// submit.pdfURL=URL;
		await submit.save();

	res.status(201).json({message:'You have successfully edited the assignment'});
}
	catch(err){
		if(!err.statusCode){
			err.statusCode=500
			next(err);
		}

	}
};







