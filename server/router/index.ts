import userRouter from "../controller/user";
import emailRouter from "../controller/email";
import blogRouter from "../controller/blog";
import app from "../app";
const path = require('path')
const express = require('express');

const history = require('connect-history-api-fallback');

const session = require('../session')


module.exports = app => {




    app.use('/api/user', userRouter)
    app.use('/api/blog', blogRouter)
    app.use('/api/email', emailRouter)

    app.use('/user**', (req, res, next) => {
        console.log("用户界面",req.url)
        let user  = session.getUser(req)
        if (!user) {
            res.redirect('/login')
        } else {
            next()
        }
    })


    //启用 connect-history-api-fallback 中间件
    app.use(history( ));
    // 将dist文件夹设置为静态资源
    app.use(express.static(path.resolve(__dirname, '../../dist')));


    //Handle 404 - Keep this as a last route
    app.use((req, res, next)=>  {
        // console.log("404 not found")
        res.redirect('/')
    });







}








