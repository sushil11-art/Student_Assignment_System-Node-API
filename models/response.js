const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const responseSchema=new Schema({

	teacher:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:'Teacher'
	},
	student:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:'Student'
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
