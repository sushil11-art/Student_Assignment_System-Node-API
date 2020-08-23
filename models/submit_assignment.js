const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const submitSchema=new Schema({

	student:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:'Student'
	},
	assignment:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:'Asssignment'
	},
	pdfURL:{
		type:String,
		required:true,
	},
	teacher:{
		type:Schema.Types.ObjectId,
		require:true,
		ref:'Teacher'
	}

},{timestamps:true});


module.exports=mongoose.model('Submit',submitSchema);
