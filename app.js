const express =require('express');

const mongoose=require('mongoose');

const dotenv=require('dotenv');

dotenv.config();

const app=express();

const bodyParser=require('body-parser');

const assignmentRoutes=require('./routes/assignment');

const authTeacher=require('./routes/teacherAuth');

const authStudent=require('./routes/studentAuth');

const assignmentStudent=require('./routes/student');


app.use(bodyParser.json());

app.use((req,res,next)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET,PUT,PATCH,DELETE,POST');
	res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
	next();

});

app.use('/api/teacher',authTeacher);

app.use('/api/student',authStudent);

app.use('/api/assignment',assignmentRoutes);

app.use('/api/myassignment',assignmentStudent);

mongoose.connect(process.env.DB_CONNECT).then(result=>{
	console.log('connected to db')
	console.log('api is running on port 4000')
	app.listen(3001);

}).catch(err=>{
	console.log(err);
});