

const request = require('@/utils/request.js')


const emailURL = '/api/email'

module.exports = {

    /**
     * 发送邮件
     * @param email  qq邮箱
     * @return {*}
     */
    sendEmail(email){
        return request({
            method:'post',
            url:emailURL+'/send',
            data:{
                email
            }
        })
    },

    /**
     * 查询验证码是否正确
     * @param email qq邮箱
     * @param code  验证码
     * @return {*}
     */
    checkEmailCode(email,code) {
        return request({
            method:'post',
            url:emailURL+'/check/code',
            data:{
                email,
                code
            }
        })
    }

}


