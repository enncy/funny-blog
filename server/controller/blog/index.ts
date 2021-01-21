import Blog from "../../service/blog";
import User from "../../service/user";

const express = require('express')
const blogRouter = express.Router()
const formatUtil = require("../../utils/format")
const session = require('../../session')

const api = {
    getOneBlog:'/get/one/:uid',
    getSomeBlog:'/get/some/:skip/:limit',
    getBlogByName:'/get/by/author/:author/:skip/:limit',
    getBlogAllCount:'/get/count/by/all',
    getBlogCountByAuthor:'/get/count/by/author/:author',
    updateBlog:'/update',
    createBlog:'/create',
    removeBlog:'/remove',
}

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
blogRouter.get(api.getOneBlog, async (req, res) => {
    let blog = await Blog.findByUid(req.params.uid)
    res.send(formatUtil.format(blog, {msg: blog ? "查询文章成功！" : "此文章不存在"}))
})

//分页获取文章
blogRouter.get(api.getSomeBlog, async (req, res) => {
    let blogs = await Blog.findByPage(parseInt(req.params.skip), parseInt(req.params.limit))
    res.send(formatUtil.format(blogs, {msg: blogs ? "获取文章列表成功！" : "获取文章列表失败！"}))
})

//通过作者获取文章并分页
blogRouter.get(api.getBlogByName, async (req, res) => {
    let blogs = await Blog.findByAuthorAndPage(req.params.author, parseInt(req.params.skip), parseInt(req.params.limit))
    res.send(formatUtil.format(blogs, {msg: blogs ? "获取用户文章列表成功！" : "获取用户文章列表失败！"}))

})

//获取文章数量
blogRouter.get(api.getBlogAllCount, async (req, res) => {
    console.log(req.url)
    Blog.getCount((err, count) => {
        if (err) res.send(formatUtil.formatError("查询数量错误！"))
        else res.send(formatUtil.format(count, {msg: count ? "查询数量成功！" : "查询数量失败！"}))
    })
})

//获取作者文章的数量
blogRouter.get(api.getBlogCountByAuthor, async (req, res) => {
    console.log(req.url)
    Blog.getCountByAuthor(req.params.author,(err, count) => {

        if (err) res.send(formatUtil.formatError("查询数量错误！"))
        else res.send(formatUtil.format(count, {msg: count ? "查询数量成功！" : "查询数量失败！"}))
    })
})

//更新
blogRouter.post(api.updateBlog, async (req, res) => {
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
blogRouter.post(api.createBlog, async (req, res) => {
    let author_info = await User.findByName(session.getUser(req).name)
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
                console.log("发布文章：", new_blog)
                res.send(formatUtil.format(Blog.format(new_blog), {msg: new_blog ? "发布成功！" : "发布失败！"}))
            }
        })
    } else {
        res.send(formatUtil.formatError("当前用户不存在！"))
    }

})

//删除文章
blogRouter.post(api.removeBlog, async (req, res) => {
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


export default blogRouter