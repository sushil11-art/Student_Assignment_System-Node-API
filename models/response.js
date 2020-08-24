const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const responseSchema=new Schema({

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
	},
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
		department:{
			type:String,
			required:true
		},
		semester:{
			type:String,
			required:true
		},
		shift:{
			type:String,
			required:true
		},
		assignmentId:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:'Asssignment'
	}
	},


	grade:{
		type:String,
		required:true
	},
	feedback:{
		type:String,
		required:true
	},
	status:{
		type:String,
		required:true
	}

});


module.exports=mongoose.model('Response',responseSchema);
