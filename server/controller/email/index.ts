
import User from "../../service/user";

const express = require('express')
const emailRouter = express.Router()
const session = require('../../session')
const emailUtil = require('../../utils/email')
const formatUtil = require("../../utils/format")
const utils = require('../../utils/index')

emailRouter.use((req, res, next) => {

    next();
})

emailRouter.post('/send', async (req, res) => {
    console.log("send email : ",req.body)
    let email = req.body.email
    let user = await  User.findByEmail(email)
    if(user){
        res.send(formatUtil.formatError("邮箱已被占用！"))
    }else{
        //4位数
        let code = utils.randomFour()
        emailUtil.sendEmailCode(email, code).then((r) => {
            session.setEmail(req, {email, code})
            res.send(formatUtil.formatSuccess("发送邮箱验证码成功，请查收！"))
        }).catch((err) => {
            if(err.message.match('Mailbox not found or access denied')){
                res.send(formatUtil.formatError("邮箱未找到或无法访问！请检查你的邮箱是否正确！"))
            }else{
                res.send(formatUtil.formatError("发送邮箱验证码失败！"))
            }

            console.error(err.message)
        })
    }

})

emailRouter.post('/check/code', (req, res) => {
    let info = emailUtil.checkEmailCode(req)

    if(info.status){
        res.send(formatUtil.formatSuccess(`邮箱:${info.data} 验证成功！`))
    }else{
        res.send(formatUtil.formatError(info.msg))
    }

})


export default emailRouter











