const express=require('express')

const router=express.Router();

const Student=require('../models/student');

const Joi=require('@hapi/joi');

const bcrypt=require('bcryptjs');


const jwt=require('jsonwebtoken');


exports.register= async(req,res)=>{

			const schema = Joi.object({ name: Joi.string() .min(6) .max(255) .required(),
			email: Joi.string() .min(6) .max(255) .required() .email(),
			password: Joi.string() .min(6) .max(255) .required(),
			department:Joi.string() .min(3) .max(255) .required(),
			semester:Joi.number().integer().min(1).max(8).default(1),
			college_rollno:Joi.number().integer().min(1).default(1),

			shift:Joi.string() .min(3) .max(255) .required()


			 });

			const {error} = schema.validate(req.body);

			if(error) return res.status(400).send(error.details[0].message);

			//check whether the user is in database or not

			const emailExist=await Student.findOne({email:req.body.email});

			if(emailExist) return res.status(400).send('Email already exist');

			const rollNoExist=await Student.findOne({college_rollno:req.body.college_rollno});
			

			if(rollNoExist) return res.status(400).send('Student with that roll no already exist.Pick a new one');


			// now hased the password before saving the user

			const salt = await bcrypt.genSalt(10);

			const hashPassword=await bcrypt.hash(req.body.password,salt);

				// create a new user object 
				const student=new Student({
				name:req.body.name,
				email:req.body.email,
			 	password:hashPassword,
			 	department:req.body.department,
			 	semester:req.body.semester,
			 	college_rollno:req.body.college_rollno,
			 	shift:req.body.shift
			 	//assignments:[]
			 });

				try{
					const savedStudent= await student.save();

					console.log('Yes now i amworking')

					res.json({mesaage:'user created successfully',savedStudent:savedStudent});
				}
				catch(err){
					res.status(400).send(err);
				}

 };

 exports.login=async(req,res)=>{
		const schema = Joi.object({ 
			email: Joi.string() .min(6) .required() .email(),
			password: Joi.string() .min(6) .required() });

			const {error} = schema.validate(req.body);

			if(error) return res.status(400).send(error.details[0].message);

			//check whether the user is in database or not

			const student=await Student.findOne({email:req.body.email});

			if(!student) return res.status(400).send('Email or password doesnot matches');

			//check whether password matches or not

			const validPass=await bcrypt.compare(req.body.password,student.password);

			if(!validPass) return res.status(400).send('Invalid password');


			// create and assign a token for user

			const token=jwt.sign({_id:student._id},process.env.STUDENT_SECRET)

			res.header('auth-token',token).send(token);

			//res.send('User is logged in');

};