import Blog from "../../../service/blog";
import User from "../../../service/user";
import {Document} from "mongoose";
import CommentsOperation from "../../../service/operation/comments";
import Comments from "../../../service/comments";

const express = require('express')
const commentsOperationRouter = express.Router()
const formatUtil = require("../../../utils/format")
const session = require('../../../session')


/**
 * @param comments_uid 评论的 uid
 */
commentsOperationRouter.post('/like',async (req,res)=>{
    const user  = session.getUser(req)
    const comment:any = Comments.findByUid(req.body.comments_uid)
    const operation:any  =   CommentsOperation.findOne(user.name,req.body.comments_uid)
    if(operation){
        let like = !operation.like
        const newOperation =  await CommentsOperation.updateLike(user.name,like)
        if(like)await Comments.updateLikeNum(req.body.comments_uid,comment.like_num+1)
        else  await Comments.updateLikeNum(req.body.comments_uid,comment.like_num-1)
        res.send(formatUtil.format(newOperation,{msg:newOperation?'操作成功！':'操作失败！'}))
    }else{
        const commentOperation =  CommentsOperation.model(user.name,true)
        commentOperation.save().then(() => {
            res.send(formatUtil.formatSuccess("操作成功！"))
        }).catch((err) => {
            console.error(err)
            res.send(formatUtil.formatError("操作失败！"))
        })
    }
})


export  default  commentsOperationRouter