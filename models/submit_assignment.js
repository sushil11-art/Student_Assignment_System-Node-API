const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const submitSchema=new Schema({

	// student:{
	// 	type:Schema.Types.ObjectId,
	// 	required:true	
	// },
	// assignment:{
	// 	type:Schema.Types.ObjectId,
	// 	required:true
	// },
	student:{
		name:{
		type:String,
		required:true,
		},
	email:{
		type:String,
		required:true,
	},
	 department:{
		type:String,
		required:true,
	},
	semester:{
		type:Number,
		required:true
	},
	college_rollno:{
		type:Number,
		required:true
	},
	shift:{
		type:String,
		required:true
	},
	studentId:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:'Student'
	}
	},
	assignment:{
		name:{
			type:String,
			required:true
		},
		subject:{
			type:String,
			required:true
		},
		assignmentId:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:'Asssignment'
	}
	},
	pdfURL:{
		type:String,
		required:true,
	},
	// teacher:{
	// 	type:Schema.Types.ObjectId,
	// 	required:true
	// }
	teacher:{
		name:{
			type:String,
			required:true
		},
		email:{
			type:String,
			required:true
		},
	teacherId:{
		type:Schema.Types.ObjectId,
		require:true,
		ref:'Teacher'
	}
}


},{timestamps:true});


module.exports=mongoose.model('Submit',submitSchema);
