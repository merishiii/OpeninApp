 import express from 'express';
 import mongoose from 'mongoose';
 import apiRoute, { apiProtected } from "./routes/api.js";
import { DB_CONNECT } from './utils/constant.js';
import AuthMiddleware from './middlewares/AuthMiddleware.js';

  const app = express();

  // mongoose.connect("DB_CONNECT",{useNewUrlParser: true}, (e)=>console.log(e));

  mongoose.connect(DB_CONNECT,
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    }
    //  ,(e)=>console.log(e);
    );
  const PORT = 8000;
  
  app.use(express.json());
  app.use('/api',apiRoute);
  app.use('/api',AuthMiddleware,apiProtected);


  
  app.listen(PORT,()=>
    console.log("Server is running")
  );