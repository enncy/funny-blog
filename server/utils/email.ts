const nodemailer = require("nodemailer");
const session = require('../session')
const formatUtil = require('./format')
const emailConfig = require('../../email.config.js');

/*
为了保证个人隐私，所以 email.config.js 这个文件会被 gitignore
 */

//域名
const smtpHost = emailConfig.smtpHost   //'smtp.qq.com'
//发送者
const sender =  emailConfig.sender  //'xxxxxxxx@qq.com'
// smtp 的 授权码 ， 在qq 邮箱的账户里面获取
const smtpPwd = emailConfig.smtpPassword // 'xxxxxxxxxxxxxxxx'

/**
 * 邮件发送模块
 * @author  klskeleton
 * @date  2021/1/11 : 15:34
 */

module.exports = {

    /**
     * 发送邮箱验证码
     * @param email 邮箱
     * @param code  验证码
     * @return {*}  Promise<Boolean>>
     */
    sendEmailCode(email,code){
        return this.sendEmailTo(email,"邮箱验证","html",`欢迎使用 funy-blog,你的邮箱验证码为: <a>${code}</a> ,请您尽快验证`)
    },


    /**
     * 发送邮件
     * @param email 邮箱
     * @param subject   标题
     * @param type  文件类型 text | html
     * @param body  邮件内容
     * @return {*}  Promise<Boolean>>
     */
    sendEmailTo(email,subject,type,body) {
        return new Promise(((resolve, reject) => {
            let transporter = nodemailer.createTransport({
                host: smtpHost,
                auth: {
                    user: sender,
                    pass: smtpPwd //授权码,通过QQ获取
                }
            });
            let mailOptions = {
                from: sender, // 发送者
                to: email, // 接受者,可以同时发送多个,以逗号隔开
                subject: subject, // 标题
                text: undefined,
                html: undefined
            };
            if(type == 'text')
            {
                mailOptions.text =body;// 文本
            }
            if(type == 'html')
            {
                mailOptions.html =body;// html
            }

            try {
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        reject(err);
                    }else{
                        resolve(true);
                    }
                });
            } catch (err) {
                reject(err);
            }
        }))

    },

    /**
     * 检测请求中的验证码是否正确
     * @param req
     */
    checkEmailCode(req){
        let code = req.body.code
        let email = req.body.email
        let emailData = session.getEmail(req)
        if (emailData) {
            if (emailData.email === email && parseInt(emailData.code) === parseInt(code)) {
                return formatUtil.format(email,{msg:"邮箱验证成功！"})
            } else {
                return formatUtil.formatError("验证码错误！")
            }
        } else {
            return formatUtil.formatError("此邮箱还未发送验证！")
        }
    }


}