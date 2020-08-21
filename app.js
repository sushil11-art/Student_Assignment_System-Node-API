const express =require('express');

const mongoose=require('mongoose');

const dotenv=require('dotenv');

dotenv.config();

const app=express();

const bodyParser=require('body-parser');

const assignmentRoutes=require('./routes/assignment');

const authRoutes=require('./routes/teacherAuth');

const studentRoutes=require('./routes/studentAuth');


app.use(bodyParser.json());

app.use((req,res,next)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET,PUT,PATCH,DELETE,POST');
	res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
	next();

});

app.use('/api/teacher',authRoutes);

app.use('/api/student',studentRoutes);

app.use('/api/assignment',assignmentRoutes);

mongoose.connect(process.env.DB_CONNECT).then(result=>{
	console.log('connected to db')
	console.log('api is running on port 4000')
	app.listen(4000);

}).catch(err=>{
	console.log(err);
});