const express =require('express');

const mongoose=require('mongoose');

const path=require('path');

const dotenv=require('dotenv');

dotenv.config();

const bodyParser=require('body-parser');

const multer=require('multer');

const app=express();


const fileStorage=multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,path.join(__dirname,'/uploads'))
	},
	filename:(req,file,cb)=>{
	cb(null, Date.now() + file.originalname) 
 	}
});

//routes

const assignmentRoutes=require('./routes/assignment');

const authTeacher=require('./routes/teacherAuth');

const authStudent=require('./routes/studentAuth');

const assignmentStudent=require('./routes/student');

//middlewares
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(multer({storage:fileStorage}).single('selectedFile'));

//app.use('/uploads',express.static(path.join(__dirname,'uploads')));

//cors
app.use((req,res,next)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET,PUT,PATCH,DELETE,POST');
	res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
	next();

});

//required apis

app.use('/api/teacher',authTeacher);

app.use('/api/student',authStudent);

app.use('/api/teacher',assignmentRoutes);

app.use('/api/student',assignmentStudent);

//global error handling
app.use((error,req,res,next)=>{
	const status=error.statusCode || 500;
	const message=error.message;
	const data=error.data;
	res.status(status).json({message:message,data:data});

});

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true}).then(result=>{
	console.log('connected to db')
	console.log('api is running on port 4000')
	app.listen(4000);

}).catch(err=>{
	console.log(err);
});