const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const studentSchema=new Schema({
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
	 department:{
		type:String,
		required:true,
		min:3,
		max:255
	},
	semester:{
		type:Number,
		required:true,
		min:1,
		max:8
	},
	college_rollno:{
		type:Number,
		required:true,
		min:1,
		unique:true	
	},
	shift:{
		type:String,
		required:true,
		min:3,
		max:255
	},
	my_assignments:{
		assignments:[
		{
		type:Object,
		ref:'Assignment',

		}
	]
}

});


// studentSchema.methods.addToMyList=function(assignment){

// };

module.exports=mongoose.model('Student',studentSchema);




// const mongoose=require('mongoose')

// const Schema=mongoose.Schema;

// const studentSchema=new Schema({
// 	name:{
// 		type:String,
// 		required:true,
// 		min:6,
// 		max:255
// 	},
// 	email:{
// 		email:String,
// 		required:true,
// 		min:6,
// 		max:255
// 	},
// 	password:{
// 		type:String,
// 		required:true,
// 		min:6,
// 		max:255
// 	},
// 	department:{
// 		type:String,
// 		required:true,
// 		min:6,
// 		max:255
// 	},
// 	semester:{
// 		type:Number,
// 		required:true,
// 	},
// 	college_rollno:{
// 		type:Number,
		
// 	},
// 	shift:{
// 		type:String,
// 		required:true,
// 		min:6,
// 		max:255
// 	},
// 	my_assignments:{
// 		assignments:[
// 		{
// 		type:Schema.Types.ObjectId,
// 		ref:'Assignment'
// 	}
// 	]
// }
// });


// module.exports=mongoose.model('Student',studentSchema);