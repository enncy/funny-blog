import Blog from "../../service/blog";
import User from "../../service/user";
import Comments from "../../service/comments";
import {Document} from "mongoose";

const express = require('express')
const blogRouter = express.Router()
const formatUtil = require("../../utils/format")
const session = require('../../session')

const api = {
    getOneBlog:{
        path:'/get/one/:uid',
        success:'查询文章成功!',
        error: "此文章不存在",
    },
    getSomeBlog:{
        path:'/get/some/:skip/:limit',
        success:'获取文章列表成功!',
        error: "获取文章列表失败!",
    },
    getBlogByName:{
        path:'/get/by/author/:author/:skip/:limit',
        success:'获取用户文章列表成功!',
        error: "获取用户文章列表失败!",
    },
    getBlogAllCount:{
        path:'/get/count/by/all',
        success:'查询数量成功',
        error: "文章数量为0!",
    },
    getBlogCountByAuthor:{
        path:'/get/count/by/author/:author',
        success:'查询数量成功',
        error: "文章数量为0!",
    },
    updateBlog:{
        path:'/update',
        success:'修改成功!',
        error: "修改失败!",
    },
    createBlog:{
        path:'/create',
        success:'发布成功!',
        error: "发布失败!",
    },
    removeBlog:{
        path:'/remove',
        success:'删除成功!',
        error: "删除失败!",
    },
    pageNotFound:'当前文章不存在!',
    userNotFound:'当前用户不存在!',
}

blogRouter.use((req, res, next) => {
    session.valid(/\/(update|create|remove)/,req,res,next)
})

//获取文章
blogRouter.get(api.getOneBlog.path, async (req, res) => {
    let blog:any = await Blog.findByUid(req.params.uid)
    res.send(formatUtil.format(blog, {msg: blog ?api.getOneBlog.success : api.getOneBlog.error}))
})

//分页获取文章
blogRouter.get(api.getSomeBlog.path, async (req, res) => {
    let blogs = await Blog.findByPage(Math.round(req.params.skip), Math.round(req.params.limit))
    res.send(formatUtil.format(blogs, {msg: blogs ? api.getSomeBlog.success : api.getSomeBlog.error}))
})

//通过作者获取文章并分页
blogRouter.get(api.getBlogByName.path, async (req, res) => {
    let blogs = await Blog.findByAuthorAndPage(req.params.author, Math.round(req.params.skip), Math.round(req.params.limit))
    res.send(formatUtil.format(blogs, {msg: blogs ? api.getBlogByName.success :api.getBlogByName.error}))
})

//获取文章数量
blogRouter.get(api.getBlogAllCount.path, async (req, res) => {
    console.log(req.url)
    Blog.getCount((err, count) => {
        if (err) res.send(formatUtil.formatError("查询数量错误！"))
        else res.send(formatUtil.format(count, {msg: count!==undefined? api.getBlogAllCount.success :api.getBlogAllCount.error}))
    })
})

//获取作者文章的数量
blogRouter.get(api.getBlogCountByAuthor.path, async (req, res) => {
    console.log(req.url)
    Blog.getCountByAuthor(req.params.author,(err, count) => {
        if (err) {
            console.log(err)
            res.send(formatUtil.formatError("查询数量错误！"))
        }
        else {
            console.log(count)
            res.send(formatUtil.format(count, {msg: count!==undefined? api.getBlogCountByAuthor.success : api.getBlogCountByAuthor.error}))
        }
    })
})

//更新
blogRouter.post(api.updateBlog.path, async (req, res) => {
    let blog = await Blog.findByUid(req.body.uid)
    if (!blog) res.send(formatUtil.formatError(api.pageNotFound))
    else{
        let new_blog = Blog.update(
            req.body.uid,
            req.body.title,
            req.body.body,
            req.body.tags,
            req.body.publish,
            req.body.original,
            req.body.original_url,
            req.body.category
        )
        res.send(formatUtil.format(new_blog, {msg: new_blog ? api.updateBlog.success : api.updateBlog.error}))
    }
})

//创建文章
blogRouter.post(api.createBlog.path, async (req, res) => {
    if (req.body.title === '') req.body.title = '无标题'
    let blog = Blog.model(req.body.author,
        req.body.title,
        req.body.body,
        req.body.tags,
        req.body.publish,
        req.body.original,
        req.body.original_url,
        req.body.category)
    blog.save().then((blog:Document) => {
        res.send(formatUtil.format(Blog.format(blog), {msg: blog ?api.createBlog.success :api.createBlog.error}))
    }).catch((err) => {
        console.error(err)
        res.send(formatUtil.formatError("发布时发生错误！"))
    })

})

//删除文章
blogRouter.post(api.removeBlog.path, async (req, res) => {
    let blog = await Blog.findByUid(req.body.uid)
    if (blog) {
        Blog.removeByUid(req.body.uid, (err) => {
            if (err) {
                res.send(formatUtil.formatError(api.removeBlog.error))
            } else {
                res.send(formatUtil.formatSuccess(api.removeBlog.success))
            }
        })
    } else {
        res.send(formatUtil.formatError(api.pageNotFound))
    }

})


export default blogRouter