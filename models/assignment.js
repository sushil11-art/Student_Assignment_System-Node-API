const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const assignmentSchema=new Schema({
	name:{
		type:String,
		// required:true		
	},
	subject:{
		type:String,
		// required:true
	},
	department:{
		type:String,
		// required:true
	},
	semester:{
		type:Number,
		// required:true
	},
	shift:{
		type:String,
		// required:true
	},
	assignmentURL:{
		type:String,
		// required:true
	},
	creator:{
		type:Schema.Types.ObjectId,
		ref:'Teacher',
		required:true
	}

},{timestamps:true});

module.exports=mongoose.model('Assignment',assignmentSchema);