import Blog from "../../service/blog";
import User from "../../service/user";
import {Document} from "mongoose";
import blogOperationRouter from "./blog";
import commentsOperationRouter from "./comments";
import userOperationRouter from "./user";


const express = require('express')
const operationsRouter = express.Router()

const session = require('../../session')

operationsRouter.use((req,res,next)=>{
    session.valid(/\/(blog|comments|user)/,req,res,next)
})
operationsRouter.use('/blog', blogOperationRouter)
operationsRouter.use('/comments',commentsOperationRouter)
operationsRouter.use('/user', userOperationRouter)



export  default  operationsRouter