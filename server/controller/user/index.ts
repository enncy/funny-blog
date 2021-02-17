import User from "../../service/user";

const express = require('express')
const userRouter = express.Router()
const formatUtil = require("../../utils/format")
const session = require('../../session')
const emailUtil = require('../../utils/email')


const api={
    getByName:{
        path:'/get/:name',
        success:'查询用户成功',
        error: "此用户不存在",
    },
    checkName:{
        path:'/check/:name',
        success:'此用户已存在',
        error: "此用户名可以使用",
    },
    login:{
        path:'/login',
        success:'登录成功',
        error: "账号或者密码错误",
    },
    loginCheck:{
        path:'/login/check',
        success:'已经登录!',
        error: "未登录!",
    },
    register:{
        path:'/register',
        success:'注册成功!',
        error: "注册失败!",
    },
    quit:{
        path:'/quit',
        success:'退出成功!',
        error: "您还未登录!",
    },
}

userRouter.use((req, res, next) => {
    next();
})

//获取用户
userRouter.get(api.getByName.path, async (req, res) => {
    let user = await User.findByName(req.params.name)
    res.send(formatUtil.format(user, {msg: user ? api.getByName.success : api.getByName.error}))
})

//判断用户名是否可用
userRouter.get(api.checkName.path, async (req, res) => {
    let user = await User.findByName(req.params.name)
    if(user)res.send(formatUtil.formatError(api.checkName.error))
    else res.send(formatUtil.formatSuccess(api.checkName.success))
})

//用户登录
userRouter.post(api.login.path, async (req, res) => {
    let user = await User.findByName(req.body.name,true)
    console.log(user)
    if (user) {
        // @ts-ignore
        if (user.name === req.body.name && user.pwd === req.body.pwd) {
            //保存用户session
            session.setUser(req, User.format(user))
            res.send(formatUtil.format(User.format(user), {msg:api.login.success}))
        } else {
            res.send(formatUtil.formatError(api.login.error))
        }
    } else {
        res.send(formatUtil.formatError(api.login.error))
    }
})

//检测用户是否登录
userRouter.get(api.loginCheck.path, async (req, res) => {
    let sessionUser = session.getUser(req)
    if(sessionUser){
        let user = await User.findByName(sessionUser.name)
        if (user) {
            res.send(formatUtil.format(User.format(user), {msg: api.loginCheck.success}))
        } else {
            res.send(formatUtil.formatError(api.loginCheck.error))
        }
    }else{
        res.send(formatUtil.formatError(api.loginCheck.error))
    }
})

//注册
userRouter.post(api.register.path, async (req, res) => {
    let user = await User.findByName(req.body.name)
    if (user) {
        res.send(formatUtil.formatError('此用户名已存在！'))
    } else {
        //再做一层邮箱验证
        let info = emailUtil.checkEmailCode(req)
        if (info.status) {
            //注册
            let user = User.model(req.body.name,req.body.pwd,   req.body.email )
            user.save().then(() => {
                //保存用户session
                session.setUser(req, user)
                res.send(formatUtil.format(User.format(user), {msg:api.register.success}))
            }).catch((err) => {
                if(err){
                    res.send(formatUtil.formatError(api.register.error+':'+err.message))
                }else{
                    res.send(formatUtil.formatError(api.register.error))
                }
            })
        } else {
            res.send(formatUtil.formatError(info.msg))
        }
    }
})

//检测用户是否登录
userRouter.get(api.quit.path, async (req, res) => {
    if (session.hasUser(req)) {
        session.setUser(req,undefined)
        res.send(formatUtil.formatSuccess(api.quit.success))
    } else {
        res.send(formatUtil.formatError(api.quit.error))
    }
})


export default userRouter









