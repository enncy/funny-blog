import Blog from "../../service/blog";
import User from "../../service/user";

const express = require('express')
const blogRouter = express.Router()
const formatUtil = require("../../utils/format")
const session = require('../../session')

blogRouter.use((req, res, next) => {

    if (req.url.match('/get/')) {
        next()
    } else {
        if (session.valid(req)) {
            next()
        } else {
            res.send(formatUtil.formatError("你没有权限进行该操作！"))
        }
    }
})

//获取文章
blogRouter.get('/get/one/:uid', async (req, res) => {
    let blog = await Blog.findByUid(req.params.uid)
    res.send(formatUtil.format(blog, {msg: blog ? "查询文章成功！" : "此文章不存在"}))
})

//分页获取文章
blogRouter.get('/get/some/:skip/:limit', async (req, res) => {
    let blogs = await Blog.findByPage(parseInt(req.params.skip), parseInt(req.params.limit))
    res.send(formatUtil.format(blogs, {msg: blogs ? "获取文章列表成功！" : "获取文章列表失败！"}))
})


//更新
blogRouter.post('/update', async (req, res) => {
    let blog = await Blog.findByUid(req.body.uid)
    if (blog) {
        let new_blog = Blog.update(
            req.body.uid,
            req.body.title,
            req.body.body,
            req.body.tags,
            req.body.public,
            req.body.original,
            req.body.original_url,
            req.body.category
        )
        res.send(formatUtil.format(new_blog, {msg: new_blog ? "修改成功！" : "修改失败！"}))
    } else {
        res.send(formatUtil.formatError("此文章不存在！"))
    }
})

//创建文章
blogRouter.post('/create', async (req, res) => {
    let author_info = await User.findByName(req.body.author)
    if (author_info) {
        if (req.body.title === '') req.body.title = '无标题'
        let new_blog = Blog.model(
            req.body.author,
            author_info,
            req.body.title,
            req.body.body,
            req.body.tags,
            req.body.public,
            req.body.original,
            req.body.original_url,
            req.body.category
        )
        new_blog.save((err) => {
            if (err) {
                console.log("发布时发生错误！:", err)
                res.send(formatUtil.formatError("发布时发生错误！:" + err.message))
            } else {
                res.send(formatUtil.format(Blog.format(new_blog), {msg: new_blog ? "发布成功！" : "发布失败！"}))
            }
        })
    } else {
        res.send(formatUtil.formatError("当前用户不存在！"))
    }

})

//删除文章
blogRouter.post('/remove', async (req, res) => {
    let blog = await Blog.findByUid(req.body.uid)
    if (blog) {
        Blog.removeByUid(req.body.uid, (err) => {
            if (err) {
                res.send(formatUtil.formatError("删除失败！"))
            } else {
                res.send(formatUtil.formatSuccess("删除成功！"))
            }
        })
    } else {
        res.send(formatUtil.formatError("此文章不存在！"))
    }

})

//通过作者获取文章并分页
blogRouter.get('/article/:author/:skip/:limit', async (req, res) => {
    let user = session.getUser(req)
    if (user && user.name === req.params.author) {
        let blogs = await Blog.findByAuthorAndPage(req.params.author, parseInt(req.params.skip), parseInt(req.params.limit))
        res.send(formatUtil.format(blogs, {msg: blogs ? "获取用户文章列表成功！" : "获取用户文章列表失败！"}))
    } else {
        res.send(formatUtil.formatError("你没有权限获取文章！"))
    }

})


export default blogRouter