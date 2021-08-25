const request = require('@/utils/request.js')
const commentsOperationsURL = '/api/operations/blog'


module.exports = {

    like(like,comments_uid){
        return request({
            method:'post',
            url:commentsOperationsURL+'/like',
            data:{
                like,comments_uid
            }
        })
    },

}