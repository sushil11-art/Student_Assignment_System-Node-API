const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const teacherSchema=new Schema({
	name:{
		type:String,
		required:true,
		min:6,
		max:255
	},
	email:{
		type:String,
		required:true,
		min:6,
		max:255
	},
	password:{
		type:String,	
		required:true,
		min:6,
		max:255
	},
	assignment:[{type:Schema.Types.ObjectId,
		ref:'Assignment'}]
});

module.exports=mongoose.model('Teacher',teacherSchema);
