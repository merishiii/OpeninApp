import express from 'express';
import Register from '../controllers/Register.controller.js';
import { RegisterSchema } from '../validationSchema/RegisterSchema.js';
import { LoginSchema } from '../validationSchema/LoginSchema.js';
import Login from '../controllers/login.controller.js';

const apiRoute = express.Router();


apiRoute.post('/register', RegisterSchema, Register);

apiRoute.post('/login', LoginSchema,Login);


export default apiRoute;
