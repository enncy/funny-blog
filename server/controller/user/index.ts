import User from "../../service/user";

const express = require('express')
const userRouter = express.Router()
const formatUtil = require("../../utils/format")
const session = require('../../session')
const emailUtil = require('../../utils/email')

userRouter.use((req, res, next) => {
    next();
})

//获取用户
userRouter.get('/get/:name', async (req, res) => {
    let user = await User.findByName(req.params.name)
    res.send(formatUtil.format(user, {msg: user ? "查询用户成功！" : "此用户不存在"}))
})

//判断用户名是否可用
userRouter.get('/check/:name', async (req, res) => {
    let user = await User.findByName(req.params.name)
    if(user)res.send(formatUtil.formatError('此用户已存在'))
    else res.send(formatUtil.formatSuccess('此用户名可以使用'))
})

//用户登录
userRouter.post('/login', async (req, res) => {
    let user = await User.findByName(req.body.name,true)
    console.log(user)
    if (user) {
        // @ts-ignore
        if (user.name === req.body.name && user.pwd === req.body.pwd) {

            //保存用户session
            session.setUser(req, User.format(user))
            res.send(formatUtil.format(User.format(user), {msg: '登录成功！'}))
        } else {
            res.send(formatUtil.formatError('账号或者密码错误！'))
        }
    } else {
        res.send(formatUtil.formatError('账号或者密码错误！'))
    }
})

//检测用户是否登录
userRouter.get('/login/check', async (req, res) => {
    let sessionUser = session.getUser(req)
    if(sessionUser){
        let user = await User.findByName(sessionUser.name)
        if (user) {
            res.send(formatUtil.format(User.format(user), {msg: '已经登录！'}))
        } else {
            res.send(formatUtil.formatError('未登录！'))
        }
    }else{
        res.send(formatUtil.formatError('未登录！'))
    }
})

//注册
userRouter.post('/register', async (req, res) => {
    let user = await User.findByName(req.body.name)
    if (user) {
        res.send(formatUtil.formatError('此用户名已存在！'))
    } else {
        //再做一层邮箱验证
        let info = emailUtil.checkEmailCode(req)
        if (info.status) {
            //注册
            let user = User.model(req.body.name,    req.body.pwd,   req.body.email )
            console.log("用户注册",user)
            user.save().then(() => {
                //保存用户session
                session.setUser(req, user)
                res.send(formatUtil.format(User.format(user), {msg: "注册成功!"}))
            }).catch((err) => {
                if(err){
                    res.send(formatUtil.formatError("注册失败！:"+err.message))
                }else{
                    res.send(formatUtil.formatError("注册失败！"))
                }
            })
        } else {
            res.send(formatUtil.formatError(info.msg))
        }
    }
})

//检测用户是否登录
userRouter.get('/quit', async (req, res) => {
    if (session.valid(req)) {
        session.setUser(req,undefined)
        res.send(formatUtil.formatSuccess('退出成功！'))
    } else {
        res.send(formatUtil.formatError('您还未登录！'))
    }
})


export default userRouter









