

const request  = require('@/utils/request.js')


module.exports = {

    sendEmail(email){
        return request({
            method:'post',
            url:'/email/send',
            data:{
                email
            }
        })
    },

    checkEmailCode(email,code) {
        return request({
            method:'post',
            url:'/email/check/code',
            data:{
                email,
                code
            }
        })
    }

}


