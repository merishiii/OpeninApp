import { validationResult } from "express-validator";
import Users from "../models/Users.js";
import { jsonGenrate } from "../utils/helpers.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js";
import bcrypt from 'bcrypt';
import  Jwt  from "jsonwebtoken";

const Login = async (req,res) => {

    const errors = validationResult(req);
    if(errors.isEmpty())
    {
        
        const{username, password} = req.body;
        const user = await Users.findOne({username:username});

        if(!user)
        {
            return res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"Username or password is incorrect"));
        }

        const verified = bcrypt.compareSync(password,user.password)

        if(!verified){
            return res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"Username or password is incorrect"));

        }

        const token = Jwt.sign({userId:user._id},JWT_TOKEN_SECRET)

        return res.json(jsonGenrate(StatusCode.SUCCESS,"login Successful",{userId:user._id,token:token}));

        res.json(jsonGenrate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()));
        // res.send(errors);
    }

    res.send("login");
}
export default Login;