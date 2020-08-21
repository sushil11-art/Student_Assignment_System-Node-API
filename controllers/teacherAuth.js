const express=require('express')

const router=express.Router();

const Teacher=require('../models/teacher')

const Joi=require('@hapi/joi');

const bcrypt=require('bcryptjs');


const jwt=require('jsonwebtoken');


exports.register= async(req,res)=>{

			const schema = Joi.object({ name: Joi.string() .min(6) .required(),
			email: Joi.string() .min(6) .required() .email(),
			password: Joi.string() .min(6) .required() });

			const {error} = schema.validate(req.body);

			if(error) return res.status(400).send(error.details[0].message);

			//check whether the user is in database or not

			const emailExist=await Teacher.findOne({email:req.body.email});

			if(emailExist) return res.status(400).send('Email already exist');


			// now hased the password before saving the user

			const salt = await bcrypt.genSalt(10);

			const hashPassword=await bcrypt.hash(req.body.password,salt);

				// create a new user object 
				const teacher=new Teacher({
				name:req.body.name,
				email:req.body.email,
			 	password:hashPassword,
			 	assignments:[]

			 });

				try{
					const savedTeacher= await teacher.save();
					res.json({mesaage:'user created successfully',savedTeacher:savedTeacher});
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

			const teacher=await Teacher.findOne({email:req.body.email});

			if(!teacher) return res.status(400).send('Email or password doesnot matches');

			//check whether password matches or not

			const validPass=await bcrypt.compare(req.body.password,teacher.password);

			if(!validPass) return res.status(400).send('Invalid password');


			// create and assign a token for user

			const token=jwt.sign({_id:teacher._id},process.env.TOKEN_SECRET)

			res.header('auth-token',token).send(token);

			//res.send('User is logged in');

};