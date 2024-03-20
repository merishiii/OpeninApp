import { validationResult } from "express-validator"
import { jsonGenrate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constant.js";
import Users from "../models/Users.js";

export const createTodo = async (req,res) =>
{
    // res.send(req.userId);
    const error=validationResult(req);
    if(!error.isEmpty())
    {
        return res.json(jsonGenrate(StatusCode.VALIDATION_ERROR,"Todo is required",error.mapped()));
    }

    try{
        const result = await Todo.create({
            userId:req.userId,
            desc: req.body.desc,
        })

        if(result){
            const user=await Users.findOneAndUpdate({_id:req.userId},
                {$push:{todos:result}});
            return res.json(jsonGenrate(StatusCode.SUCCESS,"Todo created Successfully",result));
        }
    }catch(error)
    {
        return res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"Something Went Wrong",error));

    }


}
// export default createTodo; 