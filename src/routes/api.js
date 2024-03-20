import express from 'express';
import Register from '../controllers/Register.controller.js';
import { RegisterSchema } from '../validationSchema/RegisterSchema.js';
import { LoginSchema } from '../validationSchema/LoginSchema.js';
import Login from '../controllers/login.controller.js';
import { createTodo } from '../controllers/Todo.controller.js';
import { check } from 'express-validator';

const apiRoute = express.Router();
export const apiProtected = express.Router();



apiRoute.post('/register', RegisterSchema, Register);

apiRoute.post('/login', LoginSchema,Login);

//Protected Routes

apiProtected.post("/createTodo",[check("desc","Todo desc is required").exists()],createTodo)

export default apiRoute;
// export default apiProtected;
