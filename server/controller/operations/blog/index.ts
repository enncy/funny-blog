import Blog from "../../../service/blog";
import User from "../../../service/user";
import BlogOperation from "../../../service/operation/blog";
import {Document} from "mongoose";

const express = require('express')
const blogOperationRouter = express.Router()
const formatUtil = require("../../../utils/format")
const session = require('../../../session')


blogOperationRouter.post('/like',async(req,res)=>{
    const user  = session.getUser(req)
    const operation:any  =   BlogOperation.findOne(user.name,req.body.blog_uid)
    if(operation){
        const newOperation =  await BlogOperation.updateLike(user.name,!operation.like)
        res.send(formatUtil.format(newOperation,{msg:newOperation?'操作成功！':'操作失败！'}))
    }else{
        const blogOperation = BlogOperation.model(user.name,true,false)
        blogOperation.save().then(() => {
            res.send(formatUtil.formatSuccess("操作成功！"))
        }).catch((err) => {
            console.error(err)
            res.send(formatUtil.formatError("操作失败！"))
        })
    }
})

blogOperationRouter.post('/fav',async(req,res)=>{
    const user  = session.getUser(req)
    const operation:any  =   BlogOperation.findOne(user.name,req.body.blog_uid)
    if(operation){
        const newOperation =  await BlogOperation.updateFav(user.name,!operation.fav)
        res.send(formatUtil.format(newOperation,{msg:newOperation?'操作成功！':'操作失败！'}))
    }else{
        const blogOperation = BlogOperation.model(user.name,false,true)
        blogOperation.save().then(() => {
            res.send(formatUtil.formatSuccess("操作成功！"))
        }).catch((err) => {
            console.error(err)
            res.send(formatUtil.formatError("操作失败！"))
        })
    }
})


export  default  blogOperationRouter