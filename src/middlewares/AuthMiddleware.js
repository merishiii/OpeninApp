import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js"
import { jsonGenrate } from "../utils/helpers.js"
import  Jwt  from "jsonwebtoken";

const AuthMiddleware = (req,res,next) => { 
    if(req.headers["auth"] === undefined) {
        return res.json(jsonGenrate(StatusCode.AUTH_ERROR,"ACCESS denied"))
    }

    const token = req.headers['auth'];
    try{
        const decoded = Jwt.verify(token,JWT_TOKEN_SECRET);
        console.log(decoded);

        req.userId=decoded.userId;
        return next();
    }
    catch(error)
    {
        return res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"INvalid token"));
    }
 }

 export default AuthMiddleware