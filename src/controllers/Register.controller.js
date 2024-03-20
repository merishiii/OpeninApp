import { validationResult } from "express-validator";
import { jsonGenrate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constant.js";
import bcrypt from 'bcrypt';

const Register = async (req,res) => { 
    
    const errors=validationResult(req);

    if(errors.isEmpty()){
        const{name,username,password,email}=req.body;

        const salt= await bcrypt.genSalt(10)

        const hashPassword= await bcrypt.hash(password,salt);

        // password = hashPassword;

        //save to db
        try{
            const result=await User.create({
                name:name,
                email:email,
                password:hashPassword,
                username:username
            })
            res.json(jsongenrate(StatusCode.SUCCESS,"rEGISTRATION SUCCESSFULL",result));
        } catch(error) {
            console.log(error);
        }
    }
    else
    res.json(jsonGenrate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()));
}

export default Register;