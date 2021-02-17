import Blog from "../../service/blog";

import Comments from "../../service/comments"
import {Document} from "mongoose";
const express = require('express')
const commentsRouter = express.Router()
const formatUtil = require("../../utils/format")
const session = require('../../session')

const api = {
    getByUid:{
        path:'/get/by/uid/:uid',
        success:'获取评论成功!',
        error:'获取评论失败!',
    },
    getByBlog:{
        path:'/get/by/blog/:blogUid/:skip/:limit',
        success:'获取文章评论成功!',
        error:'获取文章评论失败!',
    },
    getByAuthor:{
        path:'/get/by/name/:author',
        success:'获取用户评论成功!',
        error:'获取用户评论失败!',
    },
    getByReplay:{
        path:'/get/by/reply/:parentUid/:skip/:limit',
        success:'获取评论回复成功!',
        error:'获取评论回复失败!',
    },

    likeComment:{
        path:'/like',
        success:'点赞评论成功!',
        error:'点赞评论失败!',
    },
    unlikeComment:{
        path:'/unlike',
        success:'取消评论成功!',
        error:'取消评论失败!',
    },

    replyComment:{
        path:'/reply',
        success:'回复评论成功!',
        error:'回复评论失败!',
    },

    createComment:{
        path:'/create',
        success:'发表评论成功!',
        error:'发表评论失败!',
    },
    removeComment:{
        path:'/remove',
        success:'删除评论成功!',
        error:'删除评论失败!',
    },
    userDoNotExist:'当前用户不存在',
    commentDoNotExist:'此评论不存在',
}

commentsRouter.use((req, res, next) => {
    session.valid(/\/(update|create|remove|like|unlike|reply)/,req,res,next)
})

//通过 uid 查询评论
commentsRouter.get(api.getByUid.path,async (req, res) => {
    let comments =await Comments.findByUid(req.params.uid)
    res.send(formatUtil.format(comments,{msg:comments?api.getByUid.success:api.getByUid.error}))
})
//通过博客查询评论
commentsRouter.get(api.getByBlog.path,async (req, res) => {
    let comments =await Comments.findByBlog(req.params.blogUid,Math.round(req.params.skip),Math.round(req.params.limit))
    res.send(formatUtil.format(comments,{msg:comments?api.getByBlog.success:api.getByBlog.error}))
})
//通过作者查询评论
commentsRouter.get(api.getByAuthor.path,async (req, res) => {
    let comments =await Comments.findByAuthor(req.params.author)
    res.send(formatUtil.format(comments,{msg:comments?api.getByAuthor.success:api.getByAuthor.error}))
})

//通过评论查询回复
commentsRouter.get(api.getByReplay.path,async (req, res) => {
    let comments =await Comments.findByReply(req.params.parentUid,Math.round(req.params.skip),Math.round(req.params.limit))
    console.log(comments)
    res.send(formatUtil.format(comments,{msg:comments?api.getByAuthor.success:api.getByAuthor.error}))
})



/**
 * 评论回复
 * parent_uid  要回复的评论 uid
 * body 回复内容
 */
commentsRouter.post(api.replyComment.path,async(req, res) => {
    const  comment:any = await Comments.findByUid(req.body.parent_uid)
    const  user =await session.getUser(req)
    if(comment){
        let newReply = Comments.model(user.name,req.body.body,req.body.parent_uid,undefined)
        //父评论
        let parent   =await Comments.findByUid(req.body.parent_uid)
        newReply.set('parent',parent)
        newReply.save().then(async () => {
            res.send(formatUtil.format(newReply,{msg:newReply?api.replyComment.success:api.createComment.error}))
        }).catch((err) => {
            console.error(err)
            res.send(formatUtil.formatError(api.replyComment.error))
        })
    }else res.send(formatUtil.formatError(api.commentDoNotExist))
})


/**
 * 发表评论
 * blog_uid  评论的博客
 * body     内容
 */
commentsRouter.post(api.createComment.path,async(req, res) => {
    const  user =await session.getUser(req)
    let newComment = Comments.model(user.name,req.body.body,undefined,req.body.blog_uid)
    newComment.save(((err, doc) => {
        if(err){
            console.error(err)
            res.send(formatUtil.formatError(api.createComment.error))
        }
        else res.send(formatUtil.format(doc,{msg:doc?api.createComment.success:api.createComment.error}))
    }))



    //     .then(async () => {
    //     console.log("创建评论",newComment)
    //     res.send(formatUtil.format(newComment,{msg:newComment?api.createComment.success:api.createComment.error}))
    // }).catch((err) => {
    //     console.error(err)
    //     res.send(formatUtil.formatError(api.createComment.error))
    // })
})


//删除评论
commentsRouter.post(api.removeComment.path,async (req, res) => {
    let comment:any = await Comments.findByUid(req.body.blog_uid)
    if (comment) {
        Comments.removeByUid(req.body.blog_uid, async(err) => {
            if (err) {
                res.send(formatUtil.formatError(api.removeComment.error))
            } else {
                res.send(formatUtil.formatSuccess(api.removeComment.success))
            }
        })
    } else  res.send(formatUtil.formatError("此评论不存在！"))
})


export  default  commentsRouter