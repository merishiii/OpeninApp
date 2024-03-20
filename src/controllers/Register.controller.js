import { validationResult } from "express-validator";
import { jsonGenrate } from "../utils/helpers.js";
import { StatusCode, JWT_TOKEN_SECRET } from "../utils/constant.js";
import bcrypt from 'bcrypt';
import Users from "../models/Users.js";
import  Jwt  from "jsonwebtoken";

// import pkg from 'jsonwebtoken';
// const { Jwt } = pkg;

// import * as jwt from 'jsonwebtoken'

// const Jwt = require('jsonwebtoken');

const Register = async (req,res) => { 
    
    const errors=validationResult(req);

    if(errors.isEmpty()){
        const{name,username,password,email}=req.body;

        const salt= await bcrypt.genSalt(10)

        const hashPassword= await bcrypt.hash(password,salt);

        // password = hashPassword;

        const userExist = await Users.findOne({$or:[
            {
                email:email
            },
            {
                username:username
            }
        ]})
        if(userExist)
        {
            return res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"User or Email already exists"))
        }
        //save to db
        try{
            const result=await Users.create({
                name:name,
                email:email,
                password:hashPassword,
                username:username
            })

            // const token = Jwt.sign({userId:result._id}, JWT_TOKEN_SECRET);
            const token = Jwt.sign({userId:result._id},JWT_TOKEN_SECRET);

            res.json(jsonGenrate(StatusCode.SUCCESS,"REGISTRATION SUCCESSFULL",{userId:result._id,token:token}));
        } catch(error) {
            console.log(error);
        }
    }
    else
    res.json(jsonGenrate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()));
}

export default Register;